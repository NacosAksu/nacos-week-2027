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
var VOLUNTEER_SHEET_NAME = "Volunteers";
var FROM_NAME = "NACOS AKSU";
var REPLY_TO = "nacosfcitaksu@gmail.com";
var ID_PREFIX = "NW27-";
var VOL_ID_PREFIX = "NW27-VOL-";
var EVENT = {
  name: "NACOS Week 2027: Confluence",
  when: "February 2027 (exact dates to be announced)",
  where: "Conference Centre, Perm Site, Akwa Ibom State University, Ikot Akpaden, Mkpat Enin",
  site: "https://nw27.vercel.app", // CHANGE to the live website address
  whatsapp: "https://whatsapp.com/channel/0029Vb87N0c9Bb5utsX0yk2R",
  teamWhatsApp: {
    media: "https://chat.whatsapp.com/JJNaojZl0Oj4EDQM9LhsMN?s=sw&p=a&mlu=4&ilr=4",
    protocol: "https://chat.whatsapp.com/GKUcXY31wpmDEjJvExnUre?s=sw&p=a&mlu=4&ilr=4",
    welfare_logistics: "https://chat.whatsapp.com/LuiTDSSpXNMAhjGacfWMpw?s=sw&p=a&mlu=4&ilr=4",
    registration: "https://chat.whatsapp.com/BBIcYbEB3b1Avj4gXuQMVm?s=sw&p=a&mlu=4&ilr=4",
    sponsorship: "https://chat.whatsapp.com/J29siJhWfLqARXxjC3fxbi?s=sw&p=a&mlu=4&ilr=4"
  },
  instagram: "https://www.instagram.com/nacos_aksu/",
  x: "https://x.com/nacos_aksu"
};
var BRAND = { green: "#089002", deep: "#005012", off: "#F5F7F2", pale: "#E6F2E3", black: "#0B0F0C" };

var HEADERS = ["Reg ID", "Timestamp", "Full name", "Email", "WhatsApp", "Department", "Level",
               "Interests", "Contact consent", "Share with partners", "Email status"];
var VOL_HEADERS = ["Volunteer ID", "Timestamp", "Full name", "Email", "WhatsApp", "Department", "Level",
                   "Committee / Team", "Availability", "Prior experience", "Email status"];
var COL = { id: 1, email: 4, status: 11 };
var VOL_COL = { id: 1, email: 4, status: 11 };

// ---------- Run once from the editor ----------
function setup() {
  getSheet_();
  getVolunteerSheet_();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "sendPending") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendPending").timeBased().everyHours(1).create();
  Logger.log("Ready. Sheets '" + SHEET_NAME + "' and '" + VOLUNTEER_SHEET_NAME + "' exist and hourly email retry is active.");
}

// ---------- Web endpoints ----------
function doGet() {
  return json_({ result: "ok", service: "NACOS Week 2027 registration & volunteer portal" });
}

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: the hidden "website" field is only ever filled by bots.
  if (p.website) return json_({ result: "success", id: ID_PREFIX + "0000" });

  var isVolunteer = p.type === "volunteer" || !!p.volunteer_team;
  var name = text_(p.name, 120);
  var email = text_(p.email, 160).toLowerCase();
  var phone = text_(p.phone, 30);
  var dept = text_(p.department, 120);
  var valid = name.length > 1 &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              phone.replace(/\D/g, "").length >= 10 &&
              dept.length > 1 &&
              (isVolunteer || p.contact_ok);
  if (!valid) return json_({ result: "error", error: "invalid" });

  var sheet, row, id;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    sheet = isVolunteer ? getVolunteerSheet_() : getSheet_();
    var last = sheet.getLastRow();

    // One registration/application per email address within this sheet.
    if (last > 1) {
      var emails = sheet.getRange(2, COL.email, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).toLowerCase() === email) {
          return json_({ result: "duplicate", id: sheet.getRange(i + 2, COL.id).getValue() });
        }
      }
    }

    if (isVolunteer) {
      id = VOL_ID_PREFIX + ("0000" + last).slice(-4);
      sheet.appendRow([
        id,
        new Date(),
        cell_(name),
        email,
        "'" + phone,
        cell_(dept),
        cell_(text_(p.level, 40)),
        cell_(text_(p.volunteer_team || p.interests, 120)),
        cell_(text_(p.availability, 120)),
        cell_(text_(p.experience, 300)),
        "pending"
      ]);
    } else {
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
    }
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
  [getSheet_(), getVolunteerSheet_()].forEach(function (sheet) {
    var last = sheet.getLastRow();
    if (last < 2) return;
    var statusCol = COL.status;
    var statuses = sheet.getRange(2, statusCol, last - 1, 1).getValues();
    for (var i = 0; i < statuses.length; i++) {
      if (statuses[i][0] !== "pending") continue;
      if (MailApp.getRemainingDailyQuota() < 1) return;
      sendRow_(sheet, i + 2);
    }
  });
}

function sendRow_(sheet, row) {
  if (MailApp.getRemainingDailyQuota() < 1) return; // stays "pending" for sendPending()
  var isVolunteer = (sheet.getName() === VOLUNTEER_SHEET_NAME);
  var v = sheet.getRange(row, 1, 1, isVolunteer ? VOL_HEADERS.length : HEADERS.length).getValues()[0];
  var person = {
    id: String(v[0]),
    name: String(v[2]),
    email: String(v[3]),
    interests: String(v[7]),
    team: isVolunteer ? String(v[7]) : "",
    availability: isVolunteer ? String(v[8]) : ""
  };
  try {
    MailApp.sendEmail({
      to: person.email,
      subject: isVolunteer
        ? "Volunteer Application Received (" + person.id + ") · NACOS Week 2027"
        : "You're registered for NACOS Week 2027 (" + person.id + ")",
      name: FROM_NAME,
      replyTo: REPLY_TO,
      body: isVolunteer ? plainVolunteerEmail_(person) : plainEmail_(person),
      htmlBody: isVolunteer ? htmlVolunteerEmail_(person) : htmlEmail_(person),
      inlineImages: { nw27logo: logoBlob_() }
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
        '<img src="cid:nw27logo" width="200" height="41" alt="NACOS Week 27" style="display:block;border:0;width:200px;height:auto;color:' + BRAND.green + ';font-family:Montserrat,Arial,Helvetica,sans-serif;font-weight:800;font-size:20px">' +
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
function getTeamWhatsAppLink_(teamName) {
  if (!teamName) return "";
  var t = String(teamName).toLowerCase();
  if (t.indexOf("media") !== -1) return EVENT.teamWhatsApp.media;
  if (t.indexOf("protocol") !== -1) return EVENT.teamWhatsApp.protocol;
  if (t.indexOf("welfare") !== -1 || t.indexOf("logistics") !== -1) return EVENT.teamWhatsApp.welfare_logistics;
  if (t.indexOf("registration") !== -1 || t.indexOf("accreditation") !== -1) return EVENT.teamWhatsApp.registration;
  if (t.indexOf("sponsor") !== -1 || t.indexOf("collaboration") !== -1) return EVENT.teamWhatsApp.sponsorship;
  return "";
}

function plainVolunteerEmail_(p) {
  var teamLink = getTeamWhatsAppLink_(p.team);
  var lines = [
    "Hi " + firstName_(p.name) + ",",
    "",
    "Thank you for applying to join the NACOS Week 2027 Organizing Crew (" + EVENT.name + ").",
    "",
    "Accreditation ID: " + p.id,
    "Selected Committee: " + p.team,
    "Availability: " + (p.availability || "Full Festival Week"),
    "",
    "We have received your application. The Planning Committee will review roles and send orientation rosters.",
    "",
    teamLink ? "Official " + p.team + " WhatsApp Group: " + teamLink + "\n" : "",
    "Follow for updates:",
    "WhatsApp channel: " + EVENT.whatsapp,
    "Instagram: " + EVENT.instagram,
    "X: " + EVENT.x,
    "",
    "Questions? Reply directly to this email.",
    "",
    "NACOS AKSU",
    "Akwa Ibom State University, Ikot Akpaden"
  ];
  return lines.filter(function (l, i, a) { return l !== "" || a[i - 1] !== ""; }).join("\n");
}

function htmlVolunteerEmail_(p) {
  var row = function (label, value) {
    return '<tr><td style="padding:10px 0;border-bottom:1px solid #d9e3d6;color:#4a554c;font-size:13px;width:140px;vertical-align:top">' + label +
           '</td><td style="padding:10px 0;border-bottom:1px solid #d9e3d6;color:' + BRAND.black + ';font-size:15px;font-weight:600">' + value + "</td></tr>";
  };
  var link = function (href, text) {
    return '<a href="' + href + '" style="color:' + BRAND.deep + ';font-weight:600;text-decoration:underline">' + text + "</a>";
  };
  var teamLink = getTeamWhatsAppLink_(p.team);

  return '' +
    '<div style="margin:0;padding:24px 12px;background:' + BRAND.pale + ';font-family:Poppins,Arial,Helvetica,sans-serif">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:' + BRAND.off + ';border-radius:14px;overflow:hidden">' +
      '<tr><td style="background:' + BRAND.black + ';padding:22px 28px;border-bottom:4px solid ' + BRAND.green + '">' +
        '<img src="cid:nw27logo" width="200" height="41" alt="NACOS Week 27" style="display:block;border:0;width:200px;height:auto;color:' + BRAND.green + ';font-family:Montserrat,Arial,Helvetica,sans-serif;font-weight:800;font-size:20px">' +
      "</td></tr>" +
      '<tr><td style="padding:28px">' +
        '<h1 style="margin:0 0 8px;font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:24px;line-height:1.2;color:' + BRAND.black + '">Volunteer Application Received</h1>' +
        '<p style="margin:0 0 20px;color:#4a554c;font-size:15px;line-height:1.6">Hi ' + esc_(firstName_(p.name)) +
          ", thank you for stepping up to serve on the NACOS Week 2027 Organizing Crew.</p>" +
        '<div style="margin:0 0 20px;padding:16px 18px;background:' + BRAND.deep + ';border-radius:10px">' +
          '<div style="color:#b9d8b6;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700">Volunteer Accreditation ID</div>' +
          '<div style="color:#ffffff;font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;letter-spacing:1px">' + esc_(p.id) + "</div>" +
        "</div>" +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">' +
          row("Committee", esc_(p.team)) +
          row("Availability", esc_(p.availability || "Full Week")) +
          row("Location", esc_(EVENT.where)) +
        "</table>" +
        (teamLink ? '<div style="margin:0 0 20px;padding:14px;background:#e2f7e0;border-left:4px solid ' + BRAND.green + ';border-radius:6px;font-size:14px;line-height:1.5;color:' + BRAND.black + '"><strong>' + esc_(p.team) + ' Working Group:</strong> Join your committee\'s active WhatsApp group for briefings and rosters: ' + link(teamLink, "Join " + esc_(p.team) + " WhatsApp &rarr;") + '</div>' : '') +
        '<p style="margin:0 0 12px;color:' + BRAND.black + ';font-size:15px;line-height:1.6">Committee leads will communicate roster assignments, training sessions and official event merchandise briefings.</p>' +
        '<p style="margin:0 0 4px;color:' + BRAND.black + ';font-size:15px;line-height:1.6">Community channels: ' +
          link(EVENT.whatsapp, "WhatsApp channel") + " &middot; " + link(EVENT.instagram, "Instagram") + " &middot; " + link(EVENT.x, "X") + "</p>" +
        '<p style="margin:16px 0 0;color:#4a554c;font-size:14px;line-height:1.6">Questions? Simply reply to this email.</p>' +
      "</td></tr>" +
      '<tr><td style="padding:16px 28px;background:' + BRAND.pale + ';color:#4a554c;font-size:12px;line-height:1.5">' +
        "NACOS AKSU, Akwa Ibom State University. You received this because you applied at " + link(EVENT.site, EVENT.site.replace("https://", "")) + "." +
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

function getVolunteerSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(VOLUNTEER_SHEET_NAME) || ss.insertSheet(VOLUNTEER_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(VOL_HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, VOL_HEADERS.length).setFontWeight("bold").setBackground(BRAND.pale);
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

// NACOS WEEK 27 logo (light version for the dark email header), 400 x 81 PNG.
// Embedded in the email itself, so it shows even before the website is live.
function logoBlob_() {
  return Utilities.newBlob(Utilities.base64Decode(LOGO_PNG_BASE64), "image/png", "nw27-logo.png");
}
var LOGO_PNG_BASE64 = "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";
