/**
 * NACOS Week 2027 registration backend (Google Apps Script).
 *
 * Saves every registration from the website into a Google Sheet and emails
 * the student a confirmation with their registration ID.
 *
 * Setup steps are in backend/SETUP.md. Paste this whole file into the
 * Apps Script editor of the registrations Google Sheet.
 *
 * Gmail limit: a free Gmail account can send about 100 emails a day from a
 * script. Registrations are always saved first. If the day's limit is used
 * up, the row is marked "pending" and sendPending() (run every hour by the
 * trigger that setup() creates) sends it once the limit resets.
 */

// ---------- Settings ----------
var SHEET_NAME = "Registrations";
var FROM_NAME = "NACOS AKSU";
var REPLY_TO = "nacosfcitaksu@gmail.com";
var ID_PREFIX = "NW27-";
var EVENT = {
  name: "NACOS Week 2027: Confluence",
  when: "February 2027 (exact dates to be announced)",
  where: "Conference Centre, Perm Site, Akwa Ibom State University, Ikot Akpaden, Mkpat Enin",
  site: "https://nw27.vercel.app", // CHANGE to the live website address
  whatsapp: "https://whatsapp.com/channel/0029Vb87N0c9Bb5utsX0yk2R",
  instagram: "https://www.instagram.com/nacos_aksu/",
  x: "https://x.com/nacos_aksu"
};
var BRAND = { green: "#089002", deep: "#005012", off: "#F5F7F2", pale: "#E6F2E3", black: "#0B0F0C" };

var HEADERS = ["Reg ID", "Timestamp", "Full name", "Email", "WhatsApp", "Department", "Level",
               "Interests", "Contact consent", "Share with partners", "Email status"];
var COL = { id: 1, email: 4, status: 11 };

// ---------- Run once from the editor ----------
function setup() {
  getSheet_();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "sendPending") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendPending").timeBased().everyHours(1).create();
  Logger.log("Ready. Sheet '" + SHEET_NAME + "' exists and the hourly email retry is on.");
}

// ---------- Web endpoints ----------
function doGet() {
  return json_({ result: "ok", service: "NACOS Week 2027 registration" });
}

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: the hidden "website" field is only ever filled by bots.
  if (p.website) return json_({ result: "success", id: ID_PREFIX + "0000" });

  var name = text_(p.name, 120);
  var email = text_(p.email, 160).toLowerCase();
  var phone = text_(p.phone, 30);
  var dept = text_(p.department, 120);
  var valid = name.length > 1 &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              phone.replace(/\D/g, "").length >= 10 &&
              dept.length > 1 &&
              p.contact_ok;
  if (!valid) return json_({ result: "error", error: "invalid" });

  var sheet, row, id;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    sheet = getSheet_();
    var last = sheet.getLastRow();

    // One registration per email address.
    if (last > 1) {
      var emails = sheet.getRange(2, COL.email, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).toLowerCase() === email) {
          return json_({ result: "duplicate", id: sheet.getRange(i + 2, COL.id).getValue() });
        }
      }
    }

    id = ID_PREFIX + ("0000" + last).slice(-4); // header is row 1, so the first person gets 0001
    sheet.appendRow([
      id,
      new Date(),
      cell_(name),
      email,
      "'" + phone, // keep the leading 0 and stop Sheets reading +234 as a formula
      cell_(dept),
      cell_(text_(p.level, 40)),
      cell_(text_(p.interests, 300)),
      "yes",
      p.share_with_partners === "yes" ? "yes" : "no",
      "pending"
    ]);
    row = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  sendRow_(sheet, row);
  return json_({ result: "success", id: id });
}

// ---------- Emails ----------
// Hourly trigger: sends any confirmations held back by the daily limit.
function sendPending() {
  var sheet = getSheet_();
  var last = sheet.getLastRow();
  if (last < 2) return;
  var statuses = sheet.getRange(2, COL.status, last - 1, 1).getValues();
  for (var i = 0; i < statuses.length; i++) {
    if (statuses[i][0] !== "pending") continue;
    if (MailApp.getRemainingDailyQuota() < 1) return;
    sendRow_(sheet, i + 2);
  }
}

function sendRow_(sheet, row) {
  if (MailApp.getRemainingDailyQuota() < 1) return; // stays "pending" for sendPending()
  var v = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  var person = { id: v[0], name: String(v[2]), email: String(v[3]), interests: String(v[7]) };
  try {
    MailApp.sendEmail({
      to: person.email,
      subject: "You're registered for NACOS Week 2027 (" + person.id + ")",
      name: FROM_NAME,
      replyTo: REPLY_TO,
      body: plainEmail_(person),
      htmlBody: htmlEmail_(person)
    });
    sheet.getRange(row, COL.status).setValue("sent " + Utilities.formatDate(new Date(), "Africa/Lagos", "d MMM HH:mm"));
  } catch (err) {
    sheet.getRange(row, COL.status).setValue("failed: " + String(err.message || err).slice(0, 120));
  }
}

function firstName_(name) {
  return String(name).replace(/^'/, "").trim().split(/\s+/)[0] || "there";
}

function plainEmail_(p) {
  return [
    "Hi " + firstName_(p.name) + ",",
    "",
    "You're registered for " + EVENT.name + ".",
    "",
    "Registration ID: " + p.id,
    "When: " + EVENT.when,
    "Where: " + EVENT.where,
    p.interests ? "Events you picked: " + p.interests : "",
    "",
    "We'll email you the exact dates, hackathon details and passes as they are confirmed.",
    "Keep your registration ID. You may need it at check-in.",
    "",
    "Follow for updates:",
    "WhatsApp channel: " + EVENT.whatsapp,
    "Instagram: " + EVENT.instagram,
    "X: " + EVENT.x,
    "",
    "Questions? Reply to this email.",
    "",
    "NACOS AKSU",
    "",
    "You received this because you registered at " + EVENT.site + "."
  ].filter(function (l, i, a) { return l !== "" || a[i - 1] !== ""; }).join("\n");
}

function htmlEmail_(p) {
  var row = function (label, value) {
    return '<tr><td style="padding:10px 0;border-bottom:1px solid #d9e3d6;color:#4a554c;font-size:13px;width:130px;vertical-align:top">' + label +
           '</td><td style="padding:10px 0;border-bottom:1px solid #d9e3d6;color:' + BRAND.black + ';font-size:15px;font-weight:600">' + value + "</td></tr>";
  };
  var link = function (href, text) {
    return '<a href="' + href + '" style="color:' + BRAND.deep + ';font-weight:600;text-decoration:underline">' + text + "</a>";
  };
  return '' +
    '<div style="margin:0;padding:24px 12px;background:' + BRAND.pale + ';font-family:Poppins,Arial,Helvetica,sans-serif">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:' + BRAND.off + ';border-radius:14px;overflow:hidden">' +
      '<tr><td style="background:' + BRAND.black + ';padding:22px 28px;border-bottom:4px solid ' + BRAND.green + '">' +
        '<div style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-weight:800;line-height:0.9;font-size:15px">' +
          '<span style="color:' + BRAND.green + '">NACOS</span><br><span style="color:' + BRAND.pale + '">WEEK</span> ' +
          '<span style="color:' + BRAND.green + ';font-size:30px;letter-spacing:-1px">27</span></div>' +
      "</td></tr>" +
      '<tr><td style="padding:28px">' +
        '<h1 style="margin:0 0 8px;font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:26px;line-height:1.15;color:' + BRAND.black + '">You\'re registered.</h1>' +
        '<p style="margin:0 0 20px;color:#4a554c;font-size:15px;line-height:1.6">Hi ' + esc_(firstName_(p.name)) +
          ", thanks for registering for " + EVENT.name + ". Here are your details.</p>" +
        '<div style="margin:0 0 20px;padding:16px 18px;background:' + BRAND.deep + ';border-radius:10px">' +
          '<div style="color:#b9d8b6;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700">Registration ID</div>' +
          '<div style="color:#ffffff;font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;letter-spacing:1px">' + esc_(p.id) + "</div>" +
        "</div>" +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">' +
          row("When", esc_(EVENT.when)) +
          row("Where", esc_(EVENT.where)) +
          (p.interests ? row("Events you picked", esc_(p.interests)) : "") +
        "</table>" +
        '<p style="margin:0 0 12px;color:' + BRAND.black + ';font-size:15px;line-height:1.6">We\'ll email you the exact dates, hackathon details and passes as they are confirmed. Keep your registration ID. You may need it at check-in.</p>' +
        '<p style="margin:0 0 4px;color:' + BRAND.black + ';font-size:15px;line-height:1.6">Follow for updates: ' +
          link(EVENT.whatsapp, "WhatsApp channel") + " &middot; " + link(EVENT.instagram, "Instagram") + " &middot; " + link(EVENT.x, "X") + "</p>" +
        '<p style="margin:16px 0 0;color:#4a554c;font-size:14px;line-height:1.6">Questions? Just reply to this email.</p>' +
      "</td></tr>" +
      '<tr><td style="padding:16px 28px;background:' + BRAND.pale + ';color:#4a554c;font-size:12px;line-height:1.5">' +
        "NACOS AKSU, Akwa Ibom State University. You received this because you registered at " + link(EVENT.site, EVENT.site.replace("https://", "")) + "." +
      "</td></tr>" +
    "</table></div>";
}

// ---------- Helpers ----------
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground(BRAND.pale);
  }
  return sheet;
}

function text_(v, max) {
  return String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
}

// Stop anything typed into the form from running as a spreadsheet formula.
function cell_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function esc_(v) {
  return String(v).replace(/^'/, "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
