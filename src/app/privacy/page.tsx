import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        background: "#ffffff",
        color: "#374151",
        minHeight: "100vh",
      }}
    >
      <div className="mx-auto max-w-[720px] px-6 py-24">
        <Link href="/" style={{ fontSize: 14, color: "#064e3b", textDecoration: "none" }}>
          ← Back to home
        </Link>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            margin: "24px 0 0",
          }}
        >
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-5" style={{ fontSize: 17, lineHeight: 1.7 }}>
          <p>
            {siteConfig.name} respects your privacy. This page explains, in plain
            terms, how we handle the information you share with us.
          </p>
          <p>
            We only collect the details you choose to give us, such as your name,
            email address, and anything you send when you book a call or contact
            us. We use that information solely to respond to you and to deliver
            the work you have engaged us for.
          </p>
          <p>
            We do not sell your data, and we do not share it with third parties
            except the tools we use to run our business (for example our booking
            and email providers), and only to the extent needed to operate.
          </p>
          <p>
            You can ask us to access, correct, or delete your information at any
            time by emailing{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: "#064e3b" }}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
