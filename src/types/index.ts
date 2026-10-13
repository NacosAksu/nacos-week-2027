export interface EventDetails {
  start: string | null;
  datesLabel: string;
  datesNote: string;
  time: string;
  venue: string;
  location: string;
}

export interface ProgrammeDays {
  hackathon: string;
  football: string;
  fashion: string;
  conference: string;
  dinner: string;
}

export interface LinksConfig {
  register: string;
  hackathonRegister: string;
  brochure: string;
  sponsorEmail: string;
  generalEmail: string;
  phone: string;
  whatsapp: string;
  mediaTeamWhatsApp?: string;
  protocolTeamWhatsApp?: string;
  welfareLogisticsWhatsApp?: string;
  registrationTeamWhatsApp?: string;
  sponsorshipTeamWhatsApp?: string;
  instagram: string;
  x: string;
  linkedin: string;
  tiktok: string;
  facultySite: string;
}

export interface FormsConfig {
  registrationEndpoint: string;
}

export interface PaymentConfig {
  bank: string;
  accountName: string;
  accountNumber: string;
}

export interface SponsorshipTier {
  name: string;
  price: number;
  slots: number;
  owns: string;
  perks: string[];
}

export interface SponsorshipConfig {
  status: string;
  statusNote: string;
  currency: string;
  tiers: SponsorshipTier[];
}

export interface PastSponsor {
  name: string;
  logo: string;
  dark?: boolean;
}

export interface SiteConfig {
  event: EventDetails;
  programme: ProgrammeDays;
  links: LinksConfig;
  forms: FormsConfig;
  payment: PaymentConfig;
  sponsorship: SponsorshipConfig;
  pastSponsors: PastSponsor[];
}
