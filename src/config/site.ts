/**
 * Central site configuration for The Distribution Lab.
 * Edit these values to update contact details, booking links, and social handles
 * across the marketing site.
 */
export const siteConfig = {
  name: "The Distribution Lab",
  tagline: "Distribution-as-a-service for B2B SaaS",
  domain: "thedistributionlab.com",
  url: "https://thedistributionlab.com",

  /** Calendly (or any booking) link used by every "Book a call" CTA. */
  calendlyUrl: "https://calendly.com/vanshicka/30min",

  /** Public contact email. */
  contactEmail: "thedistributionlab@gmail.com",

  /** Social. */
  instagramHandle: "@thedistributionlab",
  instagramUrl: "https://instagram.com/thedistributionlab",

  /** "From" details auto-filled onto generated invoices. Edit these freely. */
  invoiceFrom: {
    companyName: "The Distribution Lab",
    email: "thedistributionlab@gmail.com",
    phone: "+91-9580679832",
    website: "thedistributionlab.com",
    address: "", // full address, use commas/newlines
    taxId: "PAN: ETEPA7879C",
    /** How clients pay you — shown on every invoice. */
    paymentInstructions:
      "HDFC Bank\nA/C name: Vanshika Agarwal\nA/C no: 50100663264377\nIFSC: HDFC0002006\nUPI: vanshika0639@okhdfcbank",
    /** A standing note printed at the bottom of every invoice. */
    footerNote: "This is a non-GST record. No GST will be filed against this.",
    defaultCurrency: "USD",
  },
} as const;

export type SiteConfig = typeof siteConfig;
