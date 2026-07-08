import { siteConfig } from "@/config/site";

export default function CtaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#ffffff" }}>
      {/* Final CTA */}
      <div
        style={{ padding: "clamp(120px,15vw,180px) 24px" }}
        className="text-center"
      >
        <div className="mx-auto max-w-[780px]">
          <h2
            style={{
              fontSize: "clamp(30px,4vw,44px)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
              maxWidth: "18ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Stop being the best-kept secret in your category.
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "24px auto 0",
              maxWidth: "52ch",
            }}
          >
            A 30-minute call. No deck, no pitch. Just a straight read on where your
            distribution is leaking, and the first thing I would fix.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full px-8 py-[16px] text-[15px] font-medium text-white no-underline"
              style={{ background: "#064e3b" }}
            >
              Book a call
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-[15px] font-medium no-underline"
              style={{ color: "#6b7280" }}
            >
              or email me
            </a>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ borderTop: "1px solid #eef0ee" }}>
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-6 py-8">
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#0d0d0d" }}>
            {siteConfig.name}
          </span>
          <div className="flex flex-wrap items-center gap-6 text-[14px] font-medium">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener"
              className="no-underline"
              style={{ color: "#6b7280" }}
            >
              {siteConfig.instagramHandle}
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="no-underline"
              style={{ color: "#6b7280" }}
            >
              {siteConfig.contactEmail}
            </a>
            <span style={{ color: "#9aa9a2" }}>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
