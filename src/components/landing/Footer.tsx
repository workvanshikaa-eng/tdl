import { siteConfig } from "@/config/site";

const socials = [
  { label: "LinkedIn", href: siteConfig.linkedinUrl },
  { label: "Twitter", href: siteConfig.twitterUrl },
  { label: "Instagram", href: siteConfig.instagramUrl },
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: "12px",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #eceeec" }}>
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-[64px] min-[721px]:grid-cols-2">
        <div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d" }}>
            {siteConfig.name}
            <sup style={{ fontSize: "10px", color: "#0a7c5c", marginLeft: 2 }}>®</sup>
          </div>
          <div style={{ ...mono, color: "#6b7280", marginTop: "12px" }}>
            Distribution as a service
          </div>
        </div>
        <div className="min-[721px]:text-right">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="no-underline"
            style={{ fontSize: "15px", color: "#0d0d0d" }}
          >
            {siteConfig.contactEmail}
          </a>
          <div className="mt-5 flex gap-6 min-[721px]:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="no-underline transition-colors hover:text-[#064e3b]"
                style={{ ...mono, fontSize: "11px", color: "#6b7280" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #eceeec" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-6">
          <span style={{ ...mono, fontSize: "11px", color: "#9aa9a2" }}>
            © {year} {siteConfig.name}
          </span>
          <a
            href="/privacy"
            className="no-underline"
            style={{ ...mono, fontSize: "11px", color: "#9aa9a2" }}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
