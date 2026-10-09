/*
 * NACOS Week 2027 site configuration.
 * Every fact that can change lives here. Edit this file, not index.html.
 * Leave a value as "" or null when it is not confirmed. The page shows a
 * "to be announced" state instead of inventing anything.
 */
window.NW27 = {
  event: {
    // ISO start time. Set it once dates are final, e.g. "2027-02-01T10:00:00+01:00".
    // While null, the countdown is hidden and the page says dates are to be announced.
    start: null,
    datesLabel: "February 2027",
    datesNote: "Exact dates to be announced",
    time: "10:00 AM daily",
    venue: "Conference Centre, Perm Site",
    location: "Ikot Akpaden, Mkpat Enin, Akwa Ibom State"
  },

  // Day labels for each pillar. Leave "" until the programme is approved.
  programme: {
    hackathon: "",
    football: "",
    fashion: "",
    conference: "",
    dinner: ""
  },

  links: {
    register: "",          // e.g. a cohort.fcitaksu.com.ng style portal. "" = use the on-page form
    hackathonRegister: "", // separate hackathon portal if any
    brochure: "",          // path or URL to the sponsorship PDF, e.g. "assets/docs/nw27-sponsorship.pdf"
    sponsorEmail: "nacosfcitaksu@gmail.com", // official address only
    generalEmail: "nacosfcitaksu@gmail.com",
    phone: "09035056134",
    whatsapp: "https://whatsapp.com/channel/0029Vb87N0c9Bb5utsX0yk2R",
    instagram: "https://www.instagram.com/nacos_aksu/",
    x: "https://x.com/nacos_aksu",
    linkedin: "",
    tiktok: "",
    facultySite: "https://fcitaksu.com.ng"
  },

  forms: {
    // Google Apps Script web app URL (ends in /exec). See backend/SETUP.md.
    // Saves each registration to the Google Sheet and emails a confirmation.
    // While "", the form validates but tells people registration opens soon and sends nothing.
    registrationEndpoint: "https://script.google.com/macros/s/AKfycbwo-CgB-Bb9LNXPJV6IG6H7Vf6IW5DV7_1cGcnJZCaysQ5iUjC5i7Wqm-ySM8DLVXPv/exec"
  },

  // Payments must go to the NACOS-named student body account only. Never a personal account.
  payment: {
    bank: "",
    accountName: "",
    accountNumber: ""
  },

  sponsorship: {
    // Set to "provisional" to show a pending-approval notice above the tiers (needs a .notice[data-tier-status] element in index.html).
    status: "approved",
    statusNote: "Revised proposal pending stakeholder and Executive Council approval. Figures may change.",
    currency: "₦",
    tiers: [
      {
        name: "Title Partner",
        price: 2000000,
        slots: 1,
        owns: "The whole week. \"NACOS Week 2027: Confluence, presented by [Brand]\" plus one sector track.",
        // Only list benefits the team can deliver. Edit freely once approved.
        perks: [
          "Presenting credit on the week's name",
          "Owns one sector track",
          "Sets real hackathon problem statements for that track",
          "Category exclusivity"
        ]
      },
      {
        name: "Gold",
        price: 1000000,
        slots: 2,
        owns: "A flagship pillar: the Hackathon or the Dinner & Award Night.",
        perks: [
          "Owns a flagship pillar",
          "Sets hackathon problem statements for its sector",
          "Category exclusivity"
        ]
      },
      {
        name: "Silver",
        price: 500000,
        slots: 3,
        owns: "A crowd pillar: Football or Fashion & Pageantry.",
        perks: [
          "Owns a crowd pillar",
          "Presence at the week's largest open crowds"
        ]
      },
      {
        name: "Bronze",
        price: 200000,
        slots: 8,
        owns: "Direct student access across the week.",
        perks: [
          "Sign-up and referral rights at the events",
          "Direct student access"
        ]
      },
      {
        name: "Friends of Confluence",
        price: 100000,
        slots: 20,
        owns: "Entry level for campus and local businesses.",
        perks: [
          "Credited as a Friend of Confluence"
        ]
      }
    ]
  },

  // Brands that have engaged with AKSU or sponsored past NACOS Weeks.
  // Add one line per brand. Logos go in assets/sponsors/past/ (PNG or SVG, transparent background).
  // Example: { name: "Brand Name", logo: "assets/sponsors/past/brand-name.png" },
  // While this list is empty, the section shows placeholder tiles.
  // Add dark: true for logos with white or very light artwork, so they sit on a dark tile.
  pastSponsors: [
    { name: "Nigeria Computer Society", logo: "assets/sponsors/past/nigeria-computer-society.png" },
    { name: "Moov", logo: "assets/sponsors/past/moov.png" },
    { name: "Africinnovate", logo: "assets/sponsors/past/africinnovate.png" },
    { name: "Mastercard", logo: "assets/sponsors/past/mastercard.svg" },
    { name: "KuCoin", logo: "assets/sponsors/past/kucoin.svg" },
    { name: "Nitadel", logo: "assets/sponsors/past/nitadel.png" },
    { name: "Okike", logo: "assets/sponsors/past/okike.png" },
    { name: "CoinEx", logo: "assets/sponsors/past/coinex.png", dark: true },
    { name: "Rootstock", logo: "assets/sponsors/past/rootstock.png" },
    { name: "Movement Labs", logo: "assets/sponsors/past/movement-labs.jpg" },
    { name: "Netisens", logo: "assets/sponsors/past/netisens.png" },
    { name: "Bluresx", logo: "assets/sponsors/past/bluresx.jpg" },
    { name: "Krait", logo: "assets/sponsors/past/krait.svg" },
    { name: "", logo: "assets/sponsors/past/unnamed-a-ng.jpg" } // name to confirm
  ]
};
