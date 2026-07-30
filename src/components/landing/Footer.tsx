import { siteConfig } from "@/config/site";

const socials = [
  { label: "LinkedIn", href: siteConfig.linkedinUrl },
  { label: "Twitter", href: siteConfig.twitterUrl },
  { label: "Instagram", href: siteConfig.instagramUrl },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#ffffff", borderTop: "1px solid #f3f4f6" }}>
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-[60px] min-[721px]:grid-cols-2">
        <div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#0d0d0d" }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
            Distribution as a service.
          </div>
        </div>
        <div className="min-[721px]:text-right">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="no-underline"
            style={{ fontSize: "14px", color: "#374151" }}
          >
            {siteConfig.contactEmail}
          </a>
          <div className="mt-4 flex gap-5 min-[721px]:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="no-underline"
                style={{ fontSize: "14px", color: "#6b7280" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #f3f4f6" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-6">
          <span style={{ fontSize: "13px", color: "#9aa9a2" }}>
            Copyright {year} {siteConfig.name}
          </span>
          <a
            href="/privacy"
            className="no-underline"
            style={{ fontSize: "13px", color: "#9aa9a2" }}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
