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
    phone: "", // e.g. "+91 ..."
    website: "thedistributionlab.com",
    address: "", // full address, use commas/newlines
    taxId: "", // e.g. "GSTIN: 22AAAAA0000A1Z5" or "PAN: ..."
    /** How clients pay you — shown on every invoice. */
    paymentInstructions: "", // e.g. "Bank: HDFC · A/C: 1234567890 · IFSC: HDFC0000123 · UPI: you@upi"
    defaultCurrency: "USD",
  },
} as const;

export type SiteConfig = typeof siteConfig;
