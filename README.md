# NACOS Week 2027: Confluence

Official website for NACOS Week 2027, organised by NACOS AKSU (Nigeria Association of Computing Students, Akwa Ibom State University, Ikot Akpaden, Mkpat Enin). Hosted by the Faculty of Computing and Information Technology and open to every student at AKSU.

Theme: **Confluence**. Five tracks: energy, finance, oil and gas, medicine and technology.

## Run locally

No build step. Serve the folder with any static server:

```bash
python -m http.server 3000
```

Then open http://localhost:3000.

## Files

```
index.html        Page structure and copy
config.js         Every changeable fact: dates, programme days, links, form endpoint,
                  payment account, sponsorship tiers and prices
tokens.css        Brand colours and type from the NACOS Week 2027 brand guidelines
styles.css        Layout and components (uses tokens only)
app.js            Config binding, asset placeholders, tiers, form, nav, countdown
assets/ASSETS.md  List of every image and logo the page expects, with sizes
```

## Updating content

- **Dates, venue, prices, links:** edit `config.js`. Unconfirmed values stay `""` or `null` and the page shows "to be announced". Setting `event.start` turns on the countdown.
- **Sponsorship tiers:** edit `sponsorship.tiers` in `config.js`. While `status` is `"provisional"` the page shows a pending-approval notice.
- **Images and logos:** drop files at the paths listed in `assets/ASSETS.md`. Each dashed placeholder swaps to the real image automatically.
- **Registration:** set `forms.registrationEndpoint` (Formspree, Google Apps Script, or own API) or `links.register` for an external portal. Until then the form validates but sends nothing.

## Content rules

From the project context file: no invented dates, speakers, sponsors or figures; sponsor-facing numbers are labelled projected; student data is shared with partners only with explicit opt-in; payments go to the NACOS-named account only; no em dashes in copy.
