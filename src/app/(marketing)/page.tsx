import Link from "next/link";
import SectionLabel from "@/components/landing/SectionLabel";
import StatsBar from "@/components/landing/StatsBar";
import PullQuote from "@/components/landing/PullQuote";
import FooterCta from "@/components/landing/FooterCta";

const featured = [
  {
    client: "AI HR SaaS (name withheld)",
    stat: "198,434 impressions",
    subStat: "28 days. Zero ad spend.",
    outcome: "First paying customer came through inbound.",
  },
  {
    client: "Mockzy",
    stat: "50,000 organic reach",
    subStat: "0 ad spend. 0 influencers.",
    outcome:
      "Flatlined at under 100 impressions. We fixed the distribution. It compounded.",
  },
];

const serviceRows = [
  { n: "01", title: "Get Pipeline", desc: "LinkedIn lead generation and full outbound management" },
  { n: "02", title: "Get Visible", desc: "LinkedIn personal branding and content ghostwriting" },
  { n: "03", title: "Get Found", desc: "SEO, AEO, Reddit, and Twitter marketing" },
];

const arrow = <span style={{ fontSize: 15, lineHeight: 0 }}>→</span>;

export default function Homepage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#ffffff", padding: "160px 24px 120px" }}>
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 min-[861px]:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal>
            <h1
              style={{
                fontSize: "clamp(40px,6vw,56px)",
                fontWeight: 600,
                lineHeight: 1.1,
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
                lineHeight: 1.6,
                color: "#6b7280",
                margin: "26px 0 0",
                maxWidth: "520px",
              }}
            >
              We build the content, outbound, and distribution systems that turn
              early-stage B2B SaaS products into pipelines.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full px-7 py-[15px] text-[15px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
                style={{ background: "#064e3b" }}
              >
                Start a Project
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
                style={{ color: "#064e3b" }}
              >
                See our work {arrow}
              </Link>
            </div>
          </div>
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
                opacity: 0.2,
                width: "100%",
              }}
            />
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Featured work */}
      <section style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
            <SectionLabel>Work</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,36px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#0d0d0d",
                margin: "16px 0 0",
              }}
            >
              Results that speak.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 min-[721px]:grid-cols-2">
            {featured.map((c, i) => (
              <div
                key={c.client}
                data-reveal
                data-reveal-delay={i * 100}
                className="tdl-card"
                style={{
                  background: "#f9fafb",
                  borderRadius: 8,
                  borderTop: "4px solid #064e3b",
                  padding: 32,
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>
                  {c.client}
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#064e3b",
                    margin: "16px 0 0",
                  }}
                >
                  {c.stat}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", margin: "8px 0 0" }}>
                  {c.subStat}
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#374151", margin: "18px 0 0" }}>
                  {c.outcome}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10" data-reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
              style={{ color: "#064e3b" }}
            >
              See all work {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
            <SectionLabel>Services</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,36px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#0d0d0d",
                margin: "16px 0 0",
              }}
            >
              One system. Three outcomes.
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", margin: "14px 0 0", maxWidth: "56ch" }}>
              Content, outbound, and distribution, handled end to end.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[880px]">
            {serviceRows.map((r, i) => (
              <Link
                key={r.n}
                href="/services"
                data-reveal
                data-reveal-delay={i * 80}
                className="flex items-center gap-5 border-none py-6 no-underline transition-colors hover:bg-[#f9fafb]"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#064e3b" }}>{r.n}</span>
                <span className="min-w-0 flex-1">
                  <span className="block" style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d" }}>
                    {r.title}
                  </span>
                  <span className="mt-1 block" style={{ fontSize: "15px", color: "#6b7280" }}>
                    {r.desc}
                  </span>
                </span>
                <span style={{ flex: "0 0 auto", color: "#064e3b", fontSize: 16, lineHeight: 0 }}>→</span>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[880px]" data-reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
              style={{ color: "#064e3b" }}
            >
              View all services {arrow}
            </Link>
          </div>
        </div>
      </section>

      <PullQuote />

      {/* About tease */}
      <section style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div
          data-reveal
          className="mx-auto grid max-w-[1200px] items-center gap-14 min-[861px]:grid-cols-[0.8fr_1.1fr]"
        >
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 8,
              background: "#f9fafb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9aa9a2",
              fontSize: "13px",
            }}
          >
            Vanshika Agarwal
          </div>
          <div>
            <SectionLabel>About</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(26px,3.4vw,32px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#0d0d0d",
                margin: "16px 0 0",
              }}
            >
              Built by a founder, for founders.
            </h2>
            <div className="mt-6 space-y-5" style={{ maxWidth: "56ch" }}>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                The Distribution Lab is run by Vanshika Agarwal. She started TDL
                because she understood tech and distribution before she
                understood how rare that combination is.
              </p>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                We work with seed to Series A B2B SaaS founders in the US, UK, and
                UAE. Small team, real work, no account managers.
              </p>
            </div>
            <div className="mt-7">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium no-underline"
                style={{ color: "#064e3b" }}
              >
                More about us {arrow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
