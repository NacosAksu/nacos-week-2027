# Registration backend setup

Registrations from the website go into a Google Sheet, and each person gets a
confirmation email with a registration ID (NW27-0001, NW27-0002, ...).
It runs free on the NACOS Google account. No server or paid plan needed.

Do every step while signed in to **nacosfcitaksu@gmail.com**. Confirmation
emails are sent from whichever account deploys the script.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) and name the file `NACOS Week 2027 Registrations`.
2. Open **Extensions → Apps Script**.
3. Delete everything in `Code.gs`, then paste in all of [registration.gs](registration.gs).
4. Click **+** next to **Files → Script**, name it `email-templates`, delete what's in it, and paste in
   all of [email-templates.gs](email-templates.gs). This holds the email designs.
5. Click **Save**.

## 2. Run setup once

1. In the function dropdown at the top, choose `setup`, then click **Run**.
2. Google asks for permission. Click **Review permissions**, choose the NACOS
   account, then **Advanced → Go to (project name) → Allow**. The warning appears
   because you wrote the script yourself; it is not published by Google.
3. Back in the sheet, `Registrations`, `Volunteers` and `Speaker Suggestions` tabs now exist with headings.

`setup` also turns on an hourly job that sends any confirmation emails held
back by Gmail's daily limit (see below).

## 3. Publish it

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).

## 4. Connect the website

In `config.js`, paste the URL in:

```js
forms: {
  registrationEndpoint: "https://script.google.com/macros/s/XXXX/exec"
}
```

Commit and push. Then register once on the live site with your own email to test.

## Emails

The email designs live in [/emails](../emails) as React Email templates. Apps Script can't run
React, so `npm run email:export` renders them into [email-templates.gs](email-templates.gs) with
placeholders (`%%FIRST%%`, `%%ID%%`, ...) that `registration.gs` fills in for each person.

**After changing any email:** run `npm run email:export`, then `npm run email:test`, then paste the
new `email-templates.gs` over the old one in Apps Script and deploy a new version (see below).
Preview the designs while you work with `npm run email` (opens localhost:3001).

**Sent automatically:** the registration confirmation and the volunteer confirmation.

**Bulk emails** are sent by hand: in the Apps Script editor pick the function in the dropdown and
click **Run**. Each run sends until the day's limit or about 5 minutes, then stops. Run it again
(the next day if the limit was hit) and it carries on where it left off. Every person's status is
written to its own column, so nobody gets the same email twice. **View → Logs** shows how many
went out and how many are still waiting.

| Function | Who gets it | Before running |
|---|---|---|
| `sendProgrammeAnnouncement` | Everyone in **Registrations** | Nothing. |
| `sendReminder7Days` / `sendReminder1Day` | Everyone in **Registrations** | Fill `reminder` in [emails/_data/campaigns.ts](../emails/_data/campaigns.ts) with the real dates and day-by-day schedule, then export and paste. |
| `sendPartnerInvites` | Each row in **Partner Outreach** (Company, Contact name, Email) | Add the companies. Edit who signs it in `campaigns.ts`. |
| `sendAwardInvites` | Each row in **Award Night Guests** (Guest name, Email, Seats, Nomination) | Fill `awardNight` in `campaigns.ts`, export and paste. Leave Nomination empty for guests who aren't nominated. |

The reminder and award emails are not built until their details are filled in. Until then,
their functions stop with a message and send nothing, so no one gets placeholder dates.
Send yourself a test first: add a row with your own email, run the function, check the email,
then add everyone else.

## Things to know

- **Dual sheet routing.** General attendees and delegates go to the **Registrations**
  tab with pass IDs (`NW27-0001`...). Volunteer applications go directly to the
  **Volunteers** tab with accreditation IDs (`NW27-VOL-0001`...), their selected
  committee, availability, and experience.
- **Sending from noreply@nacosaksu.com.ng (Resend).** In the Apps Script editor open
  **Project Settings → Script Properties** and add `RESEND_API_KEY` with the Resend key
  (sending access, nacosaksu.com.ng only). Never paste the key into the code. With the key set,
  emails go through Resend; if Resend fails or hits its limit, Gmail sends instead. The
  **Email status** column shows which one was used, e.g. `sent 3 Feb 14:02 (resend)`.
- **Speaker suggestions.** The "Suggest a Speaker / Judge" form on the site saves to the
  **Speaker Suggestions** tab and emails a short notice to hello@nacosaksu.com.ng.
- **Daily email limit.** A free Gmail account can send about 100 script emails a
  day. Every registration is saved straight away. If the limit is reached, the
  row shows `pending` in the **Email status** column and the email goes out
  automatically within the next hours after the limit resets. A Google Workspace
  account raises the limit to 1,500 a day.
- **One registration per email.** If someone registers twice with the same email,
  the site tells them they are already registered and shows their existing ID.
- **Changing the script later.** After editing, use **Deploy → Manage deployments →
  Edit (pencil) → Version: New version → Deploy**. This keeps the same URL, so
  `config.js` does not need to change. A brand new deployment gives a new URL.
- **Privacy.** The sheet holds students' names, emails and phone numbers. Share it
  only with the committee members who need it. Only share details with partners
  for people whose **Share with partners** column says `yes`.
- **Export.** File → Download → CSV or Excel at any time.
