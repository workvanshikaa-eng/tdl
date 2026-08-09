import CalendlyInline from "@/components/landing/CalendlyInline";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section style={{ background: "#f5f5f0", padding: "120px 24px 100px" }}>
      <div className="mx-auto max-w-[600px] text-center" data-reveal>
        <h1
          style={{
            fontSize: "clamp(34px,5vw,48px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            margin: 0,
          }}
        >
          Start a project.
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#6b7280",
            margin: "20px auto 0",
            maxWidth: "52ch",
          }}
        >
          Tell us where you are and what you are trying to build. We will tell you
          if we can help.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[820px]">
        <CalendlyInline />
      </div>

      <p className="text-center" style={{ fontSize: "15px", color: "#6b7280", margin: "28px 0 0" }}>
        Or email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} style={{ color: "#064e3b" }}>
          {siteConfig.contactEmail}
        </a>
      </p>
    </section>
  );
}
