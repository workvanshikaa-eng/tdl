import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <header
      id="top"
      style={{
        background: "#ffffff",
        padding: "clamp(150px,20vh,220px) 24px clamp(100px,14vh,150px)",
      }}
    >
      <div className="mx-auto grid max-w-[1080px] items-center gap-16 min-[861px]:grid-cols-[1.1fr_0.9fr]">
        {/* Left: content */}
        <div className="text-left">
          <h1
            style={{
              fontSize: "clamp(38px,5.4vw,52px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Turn your product into booked pipeline.
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "24px 0 0",
              maxWidth: "44ch",
            }}
          >
            Done-for-you distribution for early to mid stage B2B SaaS founders.
            One operator, not an agency.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full px-7 py-[15px] text-[15px] font-medium text-white no-underline"
              style={{ background: "#064e3b" }}
            >
              Book a call
            </a>
            <a
              href="#results"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
              style={{ color: "#064e3b" }}
            >
              See the results
              <span style={{ fontSize: 16, lineHeight: 0 }}>→</span>
            </a>
          </div>
        </div>

        {/* Right: subtle visual */}
        <div
          aria-hidden
          className="hidden justify-self-end min-[861px]:block"
          style={{ width: "100%", maxWidth: 380 }}
        >
          <svg viewBox="0 0 400 400" width="100%" fill="none">
            {[170, 130, 90, 50].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                stroke="#064e3b"
                strokeOpacity={0.06 + i * 0.03}
                strokeWidth="1.5"
              />
            ))}
            <circle cx="200" cy="200" r="16" fill="#064e3b" fillOpacity="0.12" />
          </svg>
        </div>
      </div>
    </header>
  );
}
