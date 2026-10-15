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
4. In the `EVENT` settings near the top, change `site` to the live website address.
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

## Things to know

- **Dual sheet routing.** General attendees and delegates go to the **Registrations**
  tab with pass IDs (`NW27-0001`...). Volunteer applications go directly to the
  **Volunteers** tab with accreditation IDs (`NW27-VOL-0001`...), their selected
  committee, availability, and experience.
- **Speaker suggestions.** The "Suggest a Speaker / Judge" form on the site saves to the
  **Speaker Suggestions** tab and emails a short notice to nacosfcitaksu@gmail.com.
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
