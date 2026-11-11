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
var SUGGESTION_SHEET_NAME = "Speaker Suggestions";
var BOOTH_SHEET_NAME = "Booth Requests";
var PARTNER_SHEET_NAME = "Partner Outreach";
var GUEST_SHEET_NAME = "Award Night Guests";
var FROM_NAME = "NACOS AKSU";
var REPLY_TO = "hello@nacosaksu.com.ng";
// Emails go out through Resend from this address when the RESEND_API_KEY script property is set
// (Project Settings > Script Properties). Never paste the key into this file. Without it, Gmail sends.
var RESEND_FROM = "NACOS Week 2027 <noreply@nacosaksu.com.ng>";
var ID_PREFIX = "NW27-";
var VOL_ID_PREFIX = "NW27-VOL-";
// Event details, links and wording live in the email templates (src/config/siteConfig.ts + /emails).
// These are the committee groups a volunteer is pointed to.
var EVENT = {
  teamWhatsApp: {
    media: "https://chat.whatsapp.com/JJNaojZl0Oj4EDQM9LhsMN?s=sw&p=a&mlu=4&ilr=4",
    protocol: "https://chat.whatsapp.com/GKUcXY31wpmDEjJvExnUre?s=sw&p=a&mlu=4&ilr=4",
    welfare_logistics: "https://chat.whatsapp.com/LuiTDSSpXNMAhjGacfWMpw?s=sw&p=a&mlu=4&ilr=4",
    registration: "https://chat.whatsapp.com/BBIcYbEB3b1Avj4gXuQMVm?s=sw&p=a&mlu=4&ilr=4",
    sponsorship: "https://chat.whatsapp.com/J29siJhWfLqARXxjC3fxbi?s=sw&p=a&mlu=4&ilr=4"
  }
};
var BRAND = { green: "#089002", deep: "#005012", off: "#F5F7F2", pale: "#E6F2E3", black: "#0B0F0C" };

var HEADERS = ["Reg ID", "Timestamp", "Full name", "Email", "WhatsApp", "Department", "Level",
               "Interests", "Contact consent", "Share with partners", "Email status"];
var VOL_HEADERS = ["Volunteer ID", "Timestamp", "Full name", "Email", "WhatsApp", "Department", "Level",
                   "Committee / Team", "Availability", "Prior experience", "Email status"];
var SUGGESTION_HEADERS = ["Timestamp", "Nominee", "Role & organisation", "Track", "Profile link",
                          "Why they fit", "Committee notified"];
var BOOTH_HEADERS = ["Timestamp", "Brand / company", "Contact person", "Email", "WhatsApp", "Booth type",
                     "What they will showcase", "Special needs", "Committee notified"];
var PARTNER_HEADERS = ["Company", "Contact name", "Email", "Email status"];
var GUEST_HEADERS = ["Guest name", "Email", "Seats", "Nomination (optional)", "Email status"];
var COL = { id: 1, email: 4, status: 11 };
var VOL_COL = { id: 1, email: 4, status: 11 };

// ---------- Run once from the editor ----------
function setup() {
  getSheet_();
  getVolunteerSheet_();
  getSuggestionSheet_();
  getBoothSheet_();
  getTab_(PARTNER_SHEET_NAME, PARTNER_HEADERS);
  getTab_(GUEST_SHEET_NAME, GUEST_HEADERS);
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "sendPending") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendPending").timeBased().everyHours(1).create();
  Logger.log("Ready. Sheets '" + SHEET_NAME + "' and '" + VOLUNTEER_SHEET_NAME + "' exist and hourly email retry is active.");
}

// ---------- Web endpoints ----------
function doGet() {
  // Bump "version" on every change, then open the web app URL to confirm the new copy is live.
  return json_({ result: "ok", service: "NACOS Week 2027 registration & volunteer portal",
                 version: "2026-11-11 react-email-templates" });
}

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: the hidden "website" field is only ever filled by bots.
  if (p.website) return json_({ result: "success", id: ID_PREFIX + "0000" });

  if (p.type === "speaker_suggestion") return saveSuggestion_(p);
  if (p.type === "booth") return saveBooth_(p);
  if (p.action === "lookup") return lookup_(p);

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

// ---------- Speaker / judge suggestions ----------
// Saved to the "Speaker Suggestions" tab. The committee inbox gets a short notice for each one.
function saveSuggestion_(p) {
  var nominee = text_(p.nominee, 120);
  var role = text_(p.role, 160);
  if (nominee.length < 2 || role.length < 2) return json_({ result: "error", error: "invalid" });

  var link = text_(p.link, 300);
  if (link && !/^https?:\/\//i.test(link)) link = "";
  var track = text_(p.track, 40);
  var reason = text_(p.reason, 600);

  var sheet, row;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    sheet = getSuggestionSheet_();
    sheet.appendRow([new Date(), cell_(nominee), cell_(role), cell_(track), cell_(link), cell_(reason), "no"]);
    row = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  if (canSend_()) {
    try {
      sendMail_({
        to: REPLY_TO,
        subject: "Speaker suggestion: " + nominee + " (" + (track || "no track") + ")",
        text: [
          "A new speaker / judge suggestion came in from the website.",
          "",
          "Nominee: " + nominee,
          "Role & organisation: " + role,
          "Track: " + (track || "-"),
          "Profile: " + (link || "-"),
          "Why they fit: " + (reason || "-"),
          "",
          "All suggestions are in the '" + SUGGESTION_SHEET_NAME + "' tab of the registrations sheet."
        ].join("\n")
      });
      sheet.getRange(row, SUGGESTION_HEADERS.length).setValue("yes");
    } catch (err) {
      sheet.getRange(row, SUGGESTION_HEADERS.length).setValue("failed: " + String(err.message || err).slice(0, 80));
    }
  }
  return json_({ result: "success" });
}

// ---------- Exhibition booth requests ----------
// Saved to the "Booth Requests" tab; the committee inbox is notified. No payment is taken here.
function saveBooth_(p) {
  var brand = text_(p.brand, 120);
  var contact = text_(p.contact, 120);
  var email = text_(p.email, 160).toLowerCase();
  var phone = text_(p.phone, 30);
  var valid = brand.length > 1 && contact.length > 1 &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              phone.replace(/\D/g, "").length >= 10;
  if (!valid) return json_({ result: "error", error: "invalid" });

  var booth = text_(p.booth, 80);
  var showcase = text_(p.showcase, 600);
  var needs = text_(p.needs, 300);

  var sheet, row;
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    sheet = getBoothSheet_();
    sheet.appendRow([new Date(), cell_(brand), cell_(contact), email, "'" + phone, cell_(booth),
                     cell_(showcase), cell_(needs), "no"]);
    row = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  if (canSend_()) {
    try {
      sendMail_({
        to: REPLY_TO,
        subject: "Booth request: " + brand + " (" + (booth || "booth") + ")",
        text: [
          "A new exhibition booth request came in from the website.",
          "",
          "Brand / company: " + brand,
          "Contact person: " + contact,
          "Email: " + email,
          "WhatsApp: " + phone,
          "Booth type: " + (booth || "-"),
          "Showcasing: " + (showcase || "-"),
          "Special needs: " + (needs || "-"),
          "",
          "All requests are in the '" + BOOTH_SHEET_NAME + "' tab of the registrations sheet."
        ].join("\n")
      });
      sheet.getRange(row, BOOTH_HEADERS.length).setValue("yes");
    } catch (err) {
      sheet.getRange(row, BOOTH_HEADERS.length).setValue("failed: " + String(err.message || err).slice(0, 80));
    }
  }
  return json_({ result: "success" });
}

// ---------- Find my pass ----------
// Looks up a registration or volunteer application by email or ID.
// - Email/ID only: re-sends the confirmation to the email on file and returns nothing personal,
//   so typing someone else's email reveals nothing (at most one re-send per row every 10 minutes).
// - Email/ID plus the last 4 digits of their WhatsApp number: returns the pass so the page can
//   show it with Print / Save. Wrong digits are limited to 5 tries per hour for that row.
function lookup_(p) {
  var q = text_(p.query, 160).toLowerCase();
  if (q.length < 4) return json_({ result: "error", error: "invalid" });
  var digits = String(p.phone4 || "").replace(/\D/g, "");

  var cache = CacheService.getScriptCache();
  var sheets = [getSheet_(), getVolunteerSheet_()];
  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var last = sheet.getLastRow();
    if (last < 2) continue;
    // ID, Timestamp, Name, Email, WhatsApp, Department, Level, Interests / Team, Availability
    var values = sheet.getRange(2, 1, last - 1, 9).getValues();
    for (var i = 0; i < values.length; i++) {
      var v = values[i];
      var id = String(v[0]).toLowerCase();
      var email = String(v[COL.email - 1]).toLowerCase();
      if (q !== id && q !== email) continue;

      var rowKey = sheet.getName() + "_" + (i + 2);
      if (digits.length === 4) {
        var triesKey = "tries_" + rowKey;
        var tries = Number(cache.get(triesKey) || 0);
        if (tries >= 5) return json_({ result: "locked" });
        var phone = String(v[4]).replace(/\D/g, "");
        if (phone.slice(-4) !== digits) {
          cache.put(triesKey, String(tries + 1), 3600);
          return json_({ result: "wrong_digits" });
        }
        var isVolunteer = sheet.getName() === VOLUNTEER_SHEET_NAME;
        return json_({
          result: "found",
          pass: {
            passId: String(v[0]),
            name: String(v[2]).replace(/^'/, ""),
            email: String(v[3]),
            department: String(v[5]).replace(/^'/, ""),
            level: String(v[6]).replace(/^'/, ""),
            interests: isVolunteer ? [] : String(v[7]).split(/,\s*/).filter(String),
            team: isVolunteer ? String(v[7]) : "",
            type: isVolunteer ? "volunteer" : "delegate"
          }
        });
      }

      var sentKey = "resent_" + rowKey;
      if (!cache.get(sentKey)) {
        cache.put(sentKey, "1", 600);
        sendRow_(sheet, i + 2);
      }
      return json_({ result: "sent", to: maskEmail_(email) });
    }
  }
  return json_({ result: "not_found" });
}

function maskEmail_(email) {
  var parts = String(email).split("@");
  if (parts.length !== 2) return "";
  return parts[0].charAt(0) + "***@" + parts[1];
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
      if (!canSend_()) return;
      sendRow_(sheet, i + 2);
    }
  });
}

function sendRow_(sheet, row) {
  if (!canSend_()) return; // stays "pending" for sendPending()
  var isVolunteer = (sheet.getName() === VOLUNTEER_SHEET_NAME);
  var v = sheet.getRange(row, 1, 1, isVolunteer ? VOL_HEADERS.length : HEADERS.length).getValues()[0];
  var person = {
    id: String(v[0]),
    name: String(v[2]),
    email: String(v[3]),
    department: String(v[5]),
    level: String(v[6]),
    interests: String(v[7]),
    team: isVolunteer ? String(v[7]) : "",
    availability: isVolunteer ? String(v[8]) : ""
  };
  try {
    var mail = isVolunteer ? volunteerEmail_(person) : registrationEmail_(person);
    var via = sendMail_({
      to: person.email,
      subject: isVolunteer
        ? "Volunteer Application Received (" + person.id + ") · NACOS Week 2027"
        : "You're registered for NACOS Week 2027 (" + person.id + ")",
      text: mail.text,
      html: mail.html
    });
    sheet.getRange(row, COL.status).setValue("sent " + Utilities.formatDate(new Date(), "Africa/Lagos", "d MMM HH:mm") + " (" + via + ")");
  } catch (err) {
    if (String(err.message) === "NO_QUOTA") return; // stays "pending" for sendPending()
    sheet.getRange(row, COL.status).setValue("failed: " + String(err.message || err).slice(0, 120));
  }
}

// ---------- Sending: Resend first, Gmail as fallback ----------
function resendKey_() {
  return PropertiesService.getScriptProperties().getProperty("RESEND_API_KEY") || "";
}

// Resend's free plan allows 100 a day; the script cannot see that count, so it just tries.
function canSend_() {
  return !!resendKey_() || MailApp.getRemainingDailyQuota() > 0;
}

// Returns "resend" or "gmail". Throws NO_QUOTA when neither can send right now.
function sendMail_(m) {
  var key = resendKey_();
  if (key) {
    var payload = {
      from: RESEND_FROM,
      to: [m.to],
      reply_to: REPLY_TO,
      subject: m.subject,
      text: m.text,
      html: m.html
    };
    var res = UrlFetchApp.fetch("https://api.resend.com/emails", {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + key },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    var code = res.getResponseCode();
    if (code >= 200 && code < 300) return "resend";
    Logger.log("Resend " + code + ": " + res.getContentText().slice(0, 300) + ". Falling back to Gmail.");
  }

  if (MailApp.getRemainingDailyQuota() < 1) throw new Error("NO_QUOTA");
  var opts = {
    to: m.to,
    subject: m.subject,
    name: FROM_NAME,
    replyTo: REPLY_TO,
    body: m.text
  };
  if (m.html) opts.htmlBody = m.html;
  MailApp.sendEmail(opts);
  return "gmail";
}

function firstName_(name) {
  return String(name).replace(/^'/, "").trim().split(/\s+/)[0] || "there";
}

// ---------- Email content ----------
// The designs live in /emails (React Email). `npm run email:export` turns them into
// EMAIL_TEMPLATES in email-templates.gs, with %%TOKENS%% where personal details go.

// Fills a template's tokens. HTML gets escaped values; %25%25X%25%25 is a token inside a URL.
function fill_(key, vals) {
  var t = EMAIL_TEMPLATES[key];
  if (!t) throw new Error("NOT_BUILT: email '" + key + "' is not in email-templates.gs. " +
    "Fill emails/_data/campaigns.ts, run npm run email:export, then paste the new email-templates.gs.");
  var html = t.html, text = t.text;
  Object.keys(vals).forEach(function (k) {
    var v = String(vals[k] == null ? "" : vals[k]).replace(/^'/, "");
    html = html.split("%%" + k + "%%").join(esc_(v)).split("%25%25" + k + "%25%25").join(encodeURIComponent(v));
    text = text.split("%%" + k + "%%").join(v).split("%25%25" + k + "%25%25").join(encodeURIComponent(v));
  });
  return { html: html, text: text };
}

// Templates write a full name as "%%FIRST%% %%REST%%" and greetings as "%%FIRST%%".
function nameVals_(name) {
  var full = String(name).replace(/^'/, "").trim();
  var first = firstName_(full);
  return { FIRST: first, REST: full.slice(first.length).trim() };
}

function registrationEmail_(p) {
  var vals = nameVals_(p.name);
  var level = String(p.level).replace(/^'/, "");
  vals.ID = p.id;
  vals.DEPARTMENT = String(p.department).replace(/^'/, "") + (level ? ", " + (/^\d+$/.test(level) ? level + " Level" : level) : "");
  var mail = fill_("registration", vals);

  // The template has one event chip; repeat it for each event they picked.
  var picks = String(p.interests).split(/,\s*/).filter(String);
  mail.html = mail.html.replace(/<span([^>]*)>%%INTEREST%%<\/span>/, function (_, attrs) {
    if (!picks.length) return "All of them. We will keep you posted.";
    return picks.map(function (i) { return "<span" + attrs + ">" + esc_(i) + "</span>"; }).join("");
  });
  mail.text = mail.text.split("%%INTEREST%%").join(picks.length ? picks.join(", ") : "All of them. We will keep you posted.");
  return mail;
}

function volunteerEmail_(p) {
  var link = getTeamWhatsAppLink_(p.team);
  var vals = nameVals_(p.name);
  vals.ID = p.id;
  vals.TEAM = p.team;
  vals.AVAILABILITY = p.availability || "Full festival week";
  vals.GROUP_URL = link;
  return fill_(link ? "volunteer" : "volunteer_no_group", vals);
}

// ---------- Bulk emails: run these from the Apps Script editor ----------
// Each run sends until the day's email limit or about 5 minutes, then stops. Run it again
// (the next day if the limit was hit) and it carries on: every row records its own status,
// so nobody gets the same email twice.

function sendProgrammeAnnouncement() {
  runCampaign_(getSheet_(), "Announcement email", function (v) {
    return { to: v[3], key: "announcement", vals: { FIRST: firstName_(v[2]) },
             subject: "Five events. One week. The NACOS Week 2027 programme" };
  });
}

function sendReminder7Days() { sendReminder_(7); }
function sendReminder1Day() { sendReminder_(1); }

function sendReminder_(days) {
  runCampaign_(getSheet_(), "Reminder " + days + "d", function (v) {
    var vals = nameVals_(v[2]);
    vals.ID = v[0];
    vals.DAYS = days;
    return { to: v[3], key: days === 1 ? "reminder_one_day" : "reminder", vals: vals,
             subject: (days === 1 ? "Tomorrow" : days + " days to go") + ": NACOS Week 2027 (" + v[0] + ")" };
  });
}

// One row per company in the "Partner Outreach" tab: Company, Contact name, Email.
function sendPartnerInvites() {
  runCampaign_(getTab_(PARTNER_SHEET_NAME, PARTNER_HEADERS), "Email status", function (v) {
    return { to: v[2], key: "partnership", vals: { COMPANY: v[0], CONTACT: v[1] },
             subject: v[0] + " x NACOS Week 2027: partnership invitation" };
  });
}

// One row per guest in the "Award Night Guests" tab: Guest name, Email, Seats, Nomination (optional).
function sendAwardInvites() {
  runCampaign_(getTab_(GUEST_SHEET_NAME, GUEST_HEADERS), "Email status", function (v) {
    var nomination = String(v[3]).trim();
    return { to: v[1], key: nomination ? "award" : "award_no_nomination",
             vals: { GUEST: v[0], SEATS: v[2] || 1, NOMINATION: nomination },
             subject: "Invitation: NACOS Week 2027 Dinner & Award Night" };
  });
}

function runCampaign_(sheet, statusHeader, build) {
  var last = sheet.getLastRow();
  if (last < 2) { Logger.log("No rows in '" + sheet.getName() + "'."); return; }
  var col = statusColumn_(sheet, statusHeader);
  var rows = sheet.getRange(2, 1, last - 1, Math.max(sheet.getLastColumn(), col)).getValues();
  var started = Date.now(), sent = 0, failed = 0, waiting = 0, outOfQuota = false;

  for (var i = 0; i < rows.length; i++) {
    if (/^sent/.test(String(rows[i][col - 1]))) continue;
    var m = build(rows[i]);
    var to = String(m.to).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) continue;
    if (outOfQuota || !canSend_() || Date.now() - started > 5 * 60 * 1000) { waiting++; continue; }
    try {
      var mail = fill_(m.key, m.vals);
      var via = sendMail_({ to: to, subject: m.subject, text: mail.text, html: mail.html });
      sheet.getRange(i + 2, col).setValue("sent " + Utilities.formatDate(new Date(), "Africa/Lagos", "d MMM HH:mm") + " (" + via + ")");
      sent++;
    } catch (err) {
      if (/^NOT_BUILT/.test(String(err.message))) throw err; // stop: no row should be marked failed for this
      if (String(err.message) === "NO_QUOTA") { outOfQuota = true; waiting++; continue; }
      sheet.getRange(i + 2, col).setValue("failed: " + String(err.message || err).slice(0, 120));
      failed++;
    }
  }
  Logger.log("'" + statusHeader + "' on '" + sheet.getName() + "': " + sent + " sent, " + failed + " failed, " +
             waiting + " still to send" + (waiting ? ". Run this again later (tomorrow if the daily limit was hit)." : "."));
}

// Finds the status column for a campaign, adding it at the end of the sheet the first time.
function statusColumn_(sheet, header) {
  var heads = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var i = heads.indexOf(header);
  if (i !== -1) return i + 1;
  var col = heads.length + 1;
  sheet.getRange(1, col).setValue(header).setFontWeight("bold").setBackground(BRAND.pale);
  return col;
}

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

// ---------- Helpers ----------
// Gets a tab, creating it with bold frozen headings the first time.
function getTab_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground(BRAND.pale);
  }
  return sheet;
}

function getSheet_() { return getTab_(SHEET_NAME, HEADERS); }
function getVolunteerSheet_() { return getTab_(VOLUNTEER_SHEET_NAME, VOL_HEADERS); }
function getBoothSheet_() { return getTab_(BOOTH_SHEET_NAME, BOOTH_HEADERS); }
function getSuggestionSheet_() { return getTab_(SUGGESTION_SHEET_NAME, SUGGESTION_HEADERS); }

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
