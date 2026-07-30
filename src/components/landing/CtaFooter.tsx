import { siteConfig } from "@/config/site";

const socials = [
  { label: "LinkedIn", href: siteConfig.linkedinUrl },
  { label: "Twitter", href: siteConfig.twitterUrl },
  { label: "Instagram", href: siteConfig.instagramUrl },
];

export default function CtaFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Footer CTA */}
      <section
        id="contact"
        style={{ background: "#f9fafb", padding: "100px 24px" }}
        className="text-center"
      >
        <div className="mx-auto max-w-[720px]" data-reveal>
          <h2
            style={{
              fontSize: "clamp(30px,4.4vw,40px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
            }}
          >
            Ready to build your pipeline?
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "20px auto 0",
              maxWidth: "52ch",
            }}
          >
            Let&apos;s talk about where you are and what distribution should look
            like for your product.
          </p>
          <div className="mt-9">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full px-8 py-[16px] text-[15px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
              style={{ background: "#064e3b" }}
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid #f3f4f6" }}>
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-14 min-[721px]:grid-cols-2">
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
              © {year} {siteConfig.name}
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
    </>
  );
}
