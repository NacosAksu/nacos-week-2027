import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  event: {
    start: null, // Set ISO string when date confirmed, e.g. "2027-02-01T10:00:00+01:00"
    datesLabel: "February 2027",
    datesNote: "Exact dates to be announced",
    time: "10:00 AM daily",
    venue: "Conference Centre, Perm Site",
    location: "Ikot Akpaden, Mkpat Enin, Akwa Ibom State"
  },

  programme: {
    hackathon: "",
    football: "",
    fashion: "",
    conference: "",
    dinner: ""
  },

  links: {
    register: "",
    hackathonRegister: "",
    brochure: "/assets/docs/nacos-aksu-pitch-deck-2027.pdf",
    sponsorEmail: "hello@nacosaksu.com.ng",
    generalEmail: "hello@nacosaksu.com.ng",
    phone: "09035056134",
    phoneSecondary: "09064847152",
    whatsapp: "https://whatsapp.com/channel/0029Vb87N0c9Bb5utsX0yk2R",
    mediaTeamWhatsApp: "https://chat.whatsapp.com/JJNaojZl0Oj4EDQM9LhsMN?s=sw&p=a&mlu=4&ilr=4",
    protocolTeamWhatsApp: "https://chat.whatsapp.com/GKUcXY31wpmDEjJvExnUre?s=sw&p=a&mlu=4&ilr=4",
    welfareLogisticsWhatsApp: "https://chat.whatsapp.com/LuiTDSSpXNMAhjGacfWMpw?s=sw&p=a&mlu=4&ilr=4",
    registrationTeamWhatsApp: "https://chat.whatsapp.com/BBIcYbEB3b1Avj4gXuQMVm?s=sw&p=a&mlu=4&ilr=4",
    sponsorshipTeamWhatsApp: "https://chat.whatsapp.com/J29siJhWfLqARXxjC3fxbi?s=sw&p=a&mlu=4&ilr=4",
    instagram: "https://www.instagram.com/nacos_aksu/",
    x: "https://x.com/nacos_aksu",
    linkedin: "",
    tiktok: "",
    facultySite: "https://nacosaksu.com.ng"
  },

  forms: {
    registrationEndpoint: "https://script.google.com/macros/s/AKfycbwo-CgB-Bb9LNXPJV6IG6H7Vf6IW5DV7_1cGcnJZCaysQ5iUjC5i7Wqm-ySM8DLVXPv/exec"
  },

  payment: {
    bank: "",
    accountName: "",
    accountNumber: ""
  },

  sponsorship: {
    status: "approved",
    statusNote: "Revised proposal pending stakeholder and Executive Council approval. Figures may change.",
    currency: "₦",
    tiers: [
      {
        name: "Title Partner",
        price: 2000000,
        slots: 1,
        owns: "The whole week. \"NACOS Week 2027: Confluence, presented by [Brand]\" plus one sector track.",
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

  pastSponsors: [
    { name: "Nigeria Computer Society", logo: "/assets/sponsors/past/nigeria-computer-society.png" },
    { name: "Moov", logo: "/assets/sponsors/past/moov.png" },
    { name: "Africinnovate", logo: "/assets/sponsors/past/africinnovate.png" },
    { name: "Mastercard", logo: "/assets/sponsors/past/mastercard.svg" },
    { name: "KuCoin", logo: "/assets/sponsors/past/kucoin.svg" },
    { name: "Nitadel", logo: "/assets/sponsors/past/nitadel.png" },
    { name: "Okike", logo: "/assets/sponsors/past/okike.png" },
    { name: "CoinEx", logo: "/assets/sponsors/past/coinex.png", dark: true },
    { name: "Rootstock", logo: "/assets/sponsors/past/rootstock.png" },
    { name: "Movement Labs", logo: "/assets/sponsors/past/movement-labs.jpg" },
    { name: "Netisens", logo: "/assets/sponsors/past/netisens.png" },
    { name: "Bluresx", logo: "/assets/sponsors/past/bluresx.jpg" },
    { name: "Krait", logo: "/assets/sponsors/past/krait.svg" },
    { name: "Alexx Alpha Visuals", logo: "/assets/sponsors/past/alexx-alpha-visuals.png" },
    { name: "Esther Udokwo", logo: "/assets/sponsors/past/esther-udokwo.png" },
    { name: "Gexipay", logo: "/assets/sponsors/past/gexipay.png" },
    { name: "Injective", logo: "/assets/sponsors/past/injective.png" },
    { name: "Fhenix Africa", logo: "/assets/sponsors/past/fhenix-africa.png" },
    { name: "Google Developer Eket", logo: "/assets/sponsors/past/google-developers.png" },
    { name: "For the Love of DeFi (FTLD)", logo: "/assets/sponsors/past/ftld.png" },
    { name: "", logo: "/assets/sponsors/past/unnamed-a-ng.jpg" }
  ]
};
