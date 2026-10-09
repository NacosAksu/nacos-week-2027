# Assets to add

Drop each file at the exact path below. The page checks for it on load and swaps the dashed placeholder for the real image automatically. No code changes needed.

Photography should follow the brand guide: real people, natural colour, subtle green accents. No heavy filters, no oversaturation, no heavy green overlays.

## Brand (from the designer)

| Path | What | Notes |
|------|------|-------|
| `brand/nw27-primary-reversed.svg` | Primary NACOS WEEK 27 logo, reversed version for dark backgrounds | Used in the nav and footer. Until added, a typed stand-in shows. |
| `brand/favicon.svg` | NW27 standalone mark | Browser tab icon |
| `brand/og-image.jpg` | 1200 x 630 share image | Shown when the link is shared on WhatsApp, X, LinkedIn |
| `brand/aksu-crest.png` | AKSU crest, transparent | Footer |
| `brand/nacos-crest.png` | NACOS crest, transparent | Footer |

## Photos

| Path | What | Size |
|------|------|------|
| `hero-web.jpg` | Hero background. Done: cropped from `hero.jpg` with the Innovation Summit watermark removed | 2400 x 1312 |
| `photos/about-crowd.jpg` | Students at a previous NACOS Week | 1200 x 1500 portrait |
| `photos/pillar-hackathon.jpg` | Teams building | 1600 x 1000 |
| `photos/pillar-conference.jpg` | Conference stage or audience | 1200 x 800 |
| `photos/pillar-football.jpg` | Football match | 1200 x 800 |
| `photos/pillar-fashion.jpg` | Runway or pageant | 1200 x 800 |
| `photos/pillar-dinner.jpg` | Dinner & Award Night | 1200 x 800 |
| `archive/past-01.jpg` to `past-05.jpg` | Moments from earlier NACOS Weeks | 01 and 05: 1600 x 1000. 02, 03: square. 04: 1000 x 1300 portrait |

## People

| Path | Who |
|------|-----|
| `team/dean.jpg` | Dr. Godwin Ansa |
| `team/president.jpg` | Comr. Essien Daniel Saviour |
| `team/general-secretary.jpg` | Comr. Emmanuel Ephraim Ita |
| `team/planning-chair.jpg` | Okon Precious, Planning Committee Chairman |
| `speakers/speaker-01.jpg` to `speaker-04.jpg` | Confirmed speakers only. Update names in `index.html` |

All portraits: square, at least 800 x 800, face centred.

## Partners

| Path | What |
|------|------|
| `sponsors/title-partner.svg` | Title Partner logo |
| `sponsors/gold-1.svg`, `gold-2.svg` | Gold partner logos |
| `sponsors/silver-1.svg` | Silver partner logo |

SVG preferred. PNG with a transparent background works too (change the extension in `index.html`).

### Past sponsors and brands that have engaged with AKSU

Drop logos in `sponsors/past/` (PNG or SVG, transparent background, any width, ideally at least 120 px tall). Then add one line per brand to `pastSponsors` in `config.js`:

```js
{ name: "Brand Name", logo: "assets/sponsors/past/brand-name.png" },
```

The logos scroll in up to three rows. Any number works; until the list has entries, the section shows placeholder tiles.

## Documents

| Path | What |
|------|------|
| `docs/nw27-sponsorship.pdf` | Sponsorship brochure. Then set `links.brochure` in `config.js` |

## Not assets, but still needed (set in `config.js`)

- Event start date and time (turns on the countdown)
- Day for each pillar
- Dinner venue
- Official email, phone, WhatsApp and social links
- Registration form endpoint or portal link
- NACOS AKSU account details for partner payments

## Phone-sized copies

Phones load smaller copies of the photos so the page is fast on mobile data:

| Full file | Phone copy |
| --- | --- |
| photos/hero.jpg | photos/hero-mobile.jpg (900 x 1200 portrait crop), photos/hero-1400.jpg |
| photos/about-crowd.jpg, photos/pillar-*.jpg | same name with `-800` (800 px wide) |
| carousel/slide-0N.jpg | carousel/slide-0N-800.jpg |
| team/dean.jpg, president.jpg, general-secretary.jpg | same name with `-400` (400 px wide) |

If you replace one of these photos, replace its phone copy too, or phones keep showing the old picture.
New photos (football, speakers, Okon's portrait) work without a phone copy.
