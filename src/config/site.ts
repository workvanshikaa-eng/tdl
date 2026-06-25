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
} as const;

export type SiteConfig = typeof siteConfig;
