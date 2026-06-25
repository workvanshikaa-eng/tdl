import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Turn your product into booked pipeline`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Done-for-you distribution for B2B SaaS founders. One operator, not an agency. LinkedIn lead gen, SEO, paid ads and personal branding — run as one engine.",
  openGraph: {
    title: `${siteConfig.name} — Turn your product into booked pipeline`,
    description:
      "Done-for-you distribution for B2B SaaS founders. One operator, not an agency.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
