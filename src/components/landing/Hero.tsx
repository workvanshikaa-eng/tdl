import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <header
      id="top"
      style={{ background: "#ffffff", padding: "140px 24px 100px" }}
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 min-[861px]:grid-cols-[1.15fr_0.85fr]">
        {/* Left: content */}
        <div data-reveal className="text-left">
          <h1
            style={{
              fontSize: "clamp(40px,6vw,56px)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
              maxWidth: "15ch",
            }}
          >
            Distribution for founders who are done being invisible.
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "26px 0 0",
              maxWidth: "52ch",
            }}
          >
            We build the content, outbound, and distribution systems that turn
            early-stage B2B SaaS products into companies people have actually
            heard of.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full px-7 py-[15px] text-[15px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
              style={{ background: "#064e3b" }}
            >
              Start a Project
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
              style={{ color: "#064e3b" }}
            >
              See our work
              <span style={{ fontSize: 16, lineHeight: 0 }}>→</span>
            </a>
          </div>
        </div>

        {/* Right: subtle visual */}
        <div
          aria-hidden
          className="hidden justify-self-center min-[861px]:block"
          style={{ width: "100%", maxWidth: 420 }}
        >
          <div
            style={{
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background: "#e6f4ef",
              width: "100%",
            }}
          />
        </div>
      </div>
    </header>
  );
}
