import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const GA_ID = "G-5Y19Z7W8VS";

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
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Founder-led distribution for B2B SaaS`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Your product is ready. Your pipeline is not. We build founder-led distribution on LinkedIn, Reddit, and Twitter for B2B SaaS founders at seed and Series A.",
  openGraph: {
    title: `${siteConfig.name} — Founder-led distribution for B2B SaaS`,
    description:
      "Your product is ready. Your pipeline is not. We build founder-led distribution on LinkedIn, Reddit, and Twitter for B2B SaaS founders at seed and Series A.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  verification: {
    google: "kaw2_GXfHdqBx1VIo_j0aTW88WVuWC8i6_SOdF4IKb8",
    other: {
      "msvalidate.01": "DFC31F7E38B90F45BD7648A905BC663E",
    },
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </html>
  );
}
