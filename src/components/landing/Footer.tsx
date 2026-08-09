import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: siteConfig.linkedinUrl },
  { label: "Twitter", href: siteConfig.twitterUrl },
  { label: "Instagram", href: siteConfig.instagramUrl },
];

const heading: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
};

const pill: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(255,255,255,0.22)",
  borderRadius: 9999,
  padding: "5px 14px",
  whiteSpace: "nowrap",
};

const bottomText: React.CSSProperties = { fontSize: "12px", color: "rgba(255,255,255,0.55)" };

export default function Footer() {
  return (
    <footer style={{ background: "#064e3b" }}>
      {/* Top: four columns */}
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-[72px] min-[641px]:grid-cols-2 min-[961px]:grid-cols-4">
        {/* Column 1 */}
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: 10 }}>
            Distribution as a service.
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span style={pill}>Est. 2024</span>
            <span style={pill}>Remote. Global</span>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <div style={heading}>Navigation</div>
          <div className="mt-5 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="no-underline transition-colors hover:text-white"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <div style={heading}>Contact</div>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-5 block no-underline"
            style={{ fontSize: "14px", color: "#ffffff" }}
          >
            {siteConfig.contactEmail}
          </a>
          <div className="mt-4 flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="no-underline transition-colors hover:text-white"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <div style={heading}>Start a project</div>
          <Link
            href="/contact"
            className="tdl-footer-cta mt-5 inline-flex items-center rounded-full no-underline"
            style={{
              border: "1px solid #ffffff",
              color: "#ffffff",
              background: "transparent",
              padding: "11px 24px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: "#053f2e" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-6">
          <span style={bottomText}>2024-2026 The Distribution Lab</span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Founder-led . Distribution . B2B SaaS
          </span>
          <a href={`mailto:${siteConfig.contactEmail}`} className="no-underline" style={bottomText}>
            {siteConfig.contactEmail}
          </a>
        </div>

        {/* Oversized brand statement */}
        <div style={{ overflow: "hidden", padding: "8px 0 20px" }}>
          <div
            aria-hidden
            style={{
              fontSize: "10vw",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#0a5a44",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            The Distribution Lab
          </div>
        </div>
      </div>
    </footer>
  );
}
