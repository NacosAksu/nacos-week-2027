// Checks the email side of registration.gs against the generated email-templates.gs.
// Run: node backend/registration.test.mjs   (after `npm run email:export`)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');

// Fake sheet: rows[0] is the header row. Only what runCampaign_ touches.
function fakeSheet(name, rows) {
  return {
    rows,
    getName: () => name,
    getLastRow: () => rows.length,
    getLastColumn: () => Math.max(...rows.map((r) => r.length)),
    getRange: (r, c, nr = 1, nc = 1) => ({
      getValues: () => rows.slice(r - 1, r - 1 + nr).map((row) => Array.from({ length: nc }, (_, j) => row[c - 1 + j] ?? '')),
      setValue(v) { (rows[r - 1] ||= [])[c - 1] = v; return this; },
      setFontWeight() { return this; },
      setBackground() { return this; },
    }),
  };
}

const sent = [];
let quota = 100;
const ctx = {
  Logger: { log: () => {} },
  Utilities: { formatDate: () => '1 Jan 10:00' },
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => '' }) },
  MailApp: {
    getRemainingDailyQuota: () => quota,
    sendEmail: (o) => { quota--; sent.push(o); },
  },
};
vm.createContext(ctx);
vm.runInContext(read('./email-templates.gs'), ctx);
vm.runInContext(read('./registration.gs'), ctx);
const leftover = (s) => s.match(/%%[A-Z_]+%%|%25%25[A-Z_]+%25%25/g);

// Registration: name split, escaping, level wording, one chip per event
const reg = ctx.registrationEmail_({
  id: 'NW27-0007', name: "'Ada <b>Obi</b> & Co", department: 'Computer Science', level: '300',
  interests: 'Hackathon, Dinner & Award Night',
});
assert.equal(leftover(reg.html), null, 'registration html has unfilled tokens');
assert.equal(leftover(reg.text), null, 'registration text has unfilled tokens');
assert.ok(reg.html.includes('Ada &lt;b&gt;Obi&lt;/b&gt; &amp; Co'), 'full name escaped');
assert.ok(!reg.html.includes('<b>Obi'), 'no raw HTML from the form');
assert.ok(reg.html.includes('Computer Science, 300 Level'));
assert.ok(reg.html.includes('>Hackathon</span>') && reg.html.includes('>Dinner &amp; Award Night</span>'), 'one chip per event');
assert.ok(reg.text.includes('Hackathon, Dinner & Award Night'));

const noPicks = ctx.registrationEmail_({ id: 'NW27-0008', name: 'Bassey', department: 'Law', level: 'Postgraduate', interests: '' });
assert.ok(noPicks.html.includes('All of them') && noPicks.html.includes('Law, Postgraduate'));

// Volunteer: with and without a committee group
const vol = ctx.volunteerEmail_({ id: 'NW27-VOL-0001', name: 'Emmanuel Ita', team: 'Media & Publicity Team', availability: '' });
assert.equal(leftover(vol.html), null);
assert.ok(vol.html.includes('https://chat.whatsapp.com/JJNaojZl0Oj4EDQM9LhsMN?s=sw&amp;p=a'), 'group link filled and escaped');
assert.ok(vol.html.includes('Full festival week'));
const volTech = ctx.volunteerEmail_({ id: 'NW27-VOL-0002', name: 'Okon', team: 'Technical & Sound Team', availability: 'Weekends' });
assert.equal(leftover(volTech.html), null);
assert.ok(!volTech.html.includes('chat.whatsapp.com'), 'no group block when the team has no group');

// Partnership: company in a mailto subject gets URL-encoded
const p = ctx.fill_('partnership', { COMPANY: 'A&B Energy', CONTACT: 'Mrs. Okon' });
assert.equal(leftover(p.html), null);
assert.ok(p.html.includes('subject=A%26B%20Energy%20x%20NACOS'), 'mailto subject encoded');
assert.ok(p.html.replace(/<!-- -->/g, '').includes('Put A&amp;B Energy where'));

// Campaign: sends once per row, skips bad emails, resumes after the quota runs out
const sheet = fakeSheet('Partner Outreach', [
  ['Company', 'Contact name', 'Email', 'Email status'],
  ['One Ltd', 'Ann', 'ann@one.com', ''],
  ['Two Ltd', 'Ben', 'not-an-email', ''],
  ['Three Ltd', 'Cy', 'cy@three.com', ''],
  ['Four Ltd', 'Di', 'di@four.com', 'sent 1 Jan 09:00 (gmail)'],
]);
ctx.getTab_ = () => sheet;
quota = 1;
ctx.sendPartnerInvites();
assert.deepEqual(sent.map((m) => m.to), ['ann@one.com']);
assert.equal(sheet.rows[3][3], '', 'Three Ltd waits for quota');
quota = 10;
ctx.sendPartnerInvites();
assert.deepEqual(sent.map((m) => m.to), ['ann@one.com', 'cy@three.com'], 'no repeats, no bad emails');
assert.match(sheet.rows[1][3], /^sent/);
assert.equal(sheet.rows[2][3], '', 'invalid email row untouched');

// A campaign whose template is not built stops without marking rows failed
const guests = fakeSheet('Award Night Guests', [['Guest name', 'Email', 'Seats', 'Nomination (optional)', 'Email status'], ['Dr. X', 'x@y.com', 2, '', '']]);
ctx.getTab_ = () => guests;
if (!ctx.EMAIL_TEMPLATES.award_no_nomination) {
  assert.throws(() => ctx.sendAwardInvites(), /NOT_BUILT/);
  assert.equal(guests.rows[1][4], '');
}

console.log('registration.gs email checks passed');
