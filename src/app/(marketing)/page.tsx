import Link from "next/link";
import SectionLabel from "@/components/landing/SectionLabel";
import StatsBar from "@/components/landing/StatsBar";
import PullQuote from "@/components/landing/PullQuote";
import FooterCta from "@/components/landing/FooterCta";
import ClientMarquee from "@/components/landing/ClientMarquee";
import Spark from "@/components/landing/Spark";

const featured = [
  {
    tag: "Client / TalentGPT",
    stat: "35+",
    statLabel: "meetings booked / month",
    outcome:
      "Rebuilt founder Sahib Chawla's LinkedIn around recruiter frustration, not feature pitches. Reach jumped 2,654% and meetings compounded from zero to 35+ a month.",
    href: "/work/talentgpt",
  },
  {
    tag: "Client / Mockzy",
    stat: "50,000+",
    statLabel: "organic reach",
    outcome:
      "Flatlined under 100 impressions per post. We rebuilt the distribution. It compounded fast.",
    href: "/work",
  },
];

const services = [
  {
    n: "01",
    title: "Get Pipeline",
    items: [
      "ICP research & targeting",
      "LinkedIn lead generation",
      "Full outbound management",
      "Inbox & call booking",
    ],
  },
  {
    n: "02",
    title: "Get Visible",
    items: [
      "Founder personal branding",
      "Content ghostwriting",
      "Post design & scheduling",
      "Engagement systems",
    ],
  },
  {
    n: "03",
    title: "Get Found",
    items: [
      "SEO & answer-engine optimisation",
      "Reddit marketing",
      "Twitter / X growth",
      "Community distribution",
    ],
  },
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const linkMono: React.CSSProperties = { ...mono, fontSize: "12px", color: "#064e3b" };

export default function Homepage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#ffffff", padding: "clamp(90px,14vh,150px) 24px clamp(80px,12vh,120px)" }}>
        <div className="mx-auto max-w-[1200px]" data-reveal>
          <SectionLabel>Distribution as a service</SectionLabel>
          <h1
            style={{
              fontSize: "clamp(44px,9vw,104px)",
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#0d0d0d",
              margin: "28px 0 0",
              maxWidth: "16ch",
            }}
          >
            Distribution for founders done being invisible.
          </h1>
          <p
            style={{
              fontSize: "clamp(17px,2.2vw,20px)",
              lineHeight: 1.6,
              color: "#6b7280",
              margin: "32px 0 0",
              maxWidth: "560px",
            }}
          >
            We build the content, outbound, and distribution systems that turn
            early-stage B2B SaaS products into booked pipeline.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-[15px] text-white no-underline transition-colors hover:bg-[#0a7c5c]"
              style={{ ...mono, fontSize: "13px", background: "#064e3b" }}
            >
              <Spark size={12} color="#ffffff" />
              Start a Project
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 no-underline" style={linkMono}>
              See our work →
            </Link>
          </div>
        </div>
      </section>

      <ClientMarquee />

      <StatsBar />

      {/* Featured work */}
      <section style={{ background: "#ffffff", padding: "clamp(80px,12vh,120px) 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <SectionLabel>Featured work</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(30px,5vw,52px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "#0d0d0d",
                  margin: "18px 0 0",
                }}
              >
                Results that speak.
              </h2>
            </div>
            <Link href="/work" className="no-underline" style={linkMono}>
              See all work →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 min-[721px]:grid-cols-2">
            {featured.map((c, i) => (
              <Link
                key={c.tag}
                href={c.href}
                data-reveal
                data-reveal-delay={i * 100}
                className="group block overflow-hidden no-underline"
                style={{ borderRadius: 12, background: "#f4faf7", border: "1px solid #e3f0ea" }}
              >
                {/* Tinted media band */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#e6f4ef 0%,#d4ebe1 100%)",
                    height: 240,
                  }}
                >
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: "clamp(40px,6vw,64px)",
                        fontWeight: 600,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        color: "#064e3b",
                      }}
                    >
                      {c.stat}
                    </div>
                    <div style={{ ...mono, fontSize: "11px", color: "#0a7c5c", marginTop: 12 }}>
                      {c.statLabel}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "28px 30px 32px" }}>
                  <div style={{ ...mono, fontSize: "11px", color: "#6b7280" }}>{c.tag}</div>
                  <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#374151", margin: "14px 0 0" }}>
                    {c.outcome}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — numbered services */}
      <section style={{ background: "#f9fafb", padding: "clamp(80px,12vh,120px) 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[640px]" data-reveal>
            <SectionLabel>What we do</SectionLabel>
            <p
              style={{
                fontSize: "clamp(20px,2.6vw,26px)",
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                color: "#0d0d0d",
                margin: "20px 0 0",
              }}
            >
              Content, outbound, and distribution, handled end to end, run as one
              system instead of five disconnected tactics.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {services.map((s, si) => (
              <div
                key={s.n}
                data-reveal
                className="grid gap-6 min-[861px]:grid-cols-[0.9fr_1.1fr] min-[861px]:gap-16"
              >
                <div className="flex items-baseline gap-6">
                  <span
                    style={{
                      fontSize: "clamp(30px,4vw,48px)",
                      fontWeight: 600,
                      color: "#cfe6dc",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(32px,5vw,60px)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "#0d0d0d",
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                </div>

                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {s.items.map((it, ii) => (
                    <li
                      key={it}
                      className="flex items-center justify-between gap-4"
                      style={{
                        ...mono,
                        fontSize: "13px",
                        color: "#374151",
                        padding: "18px 0",
                        borderTop: ii === 0 ? "1px solid #dfe3e0" : "none",
                        borderBottom: "1px solid #dfe3e0",
                      }}
                    >
                      <span>{it}</span>
                      <Spark size={9} color={si === 0 && ii === 0 ? "#0a7c5c" : "#c3d3cb"} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16" data-reveal>
            <Link href="/services" className="no-underline" style={linkMono}>
              View all services →
            </Link>
          </div>
        </div>
      </section>

      <PullQuote />

      {/* About tease */}
      <section style={{ background: "#ffffff", padding: "clamp(80px,12vh,120px) 24px" }}>
        <div
          data-reveal
          className="mx-auto grid max-w-[1200px] items-center gap-14 min-[861px]:grid-cols-[0.8fr_1.1fr]"
        >
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 12,
              background: "linear-gradient(135deg,#f4faf7 0%,#e6f4ef 100%)",
              display: "flex",
              alignItems: "flex-end",
              padding: 24,
            }}
          >
            <span style={{ ...mono, fontSize: "11px", color: "#0a7c5c" }}>Vanshika Agarwal</span>
          </div>
          <div>
            <SectionLabel>About</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#0d0d0d",
                margin: "18px 0 0",
              }}
            >
              Built by a founder, for founders.
            </h2>
            <div className="mt-7 space-y-5" style={{ maxWidth: "56ch" }}>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                The Distribution Lab is run by Vanshika Agarwal. She started TDL
                because she understood tech and distribution before she understood
                how rare that combination is.
              </p>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                We work with seed to Series A B2B SaaS founders in the US, UK, and
                UAE. Small team, real work, no account managers.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="no-underline" style={linkMono}>
                More about us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
