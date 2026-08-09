import Link from "next/link";
import SectionLabel from "@/components/landing/SectionLabel";
import StatsBar from "@/components/landing/StatsBar";
import PullQuote from "@/components/landing/PullQuote";
import FooterCta from "@/components/landing/FooterCta";
import ClientMarquee from "@/components/landing/ClientMarquee";
import FounderPhoto from "@/components/landing/FounderPhoto";
import FaqAccordion from "@/components/landing/FaqAccordion";
import Spark from "@/components/landing/Spark";

const featured = [
  {
    tag: "Client / TalentGPT",
    stat: "35+",
    statLabel: "meetings booked / month",
    outcome:
      "Sahib was getting ignored on LinkedIn. We rebuilt his entire presence around the pain recruiters actually feel, not the features TalentGPT has. Reach jumped 2,654%. Meetings went from zero to 35 a month. His buyers started coming to him.",
    href: "/work/talentgpt",
  },
  {
    tag: "Client / Mockzy",
    stat: "50,000+",
    statLabel: "organic reach",
    outcome:
      "Under 100 impressions per post. Great product, invisible founder. We rebuilt the distribution from scratch around the build-in-public community. 50,000 organic reach. Zero ad spend. Zero influencers.",
    href: "/work",
  },
];

const services = [
  {
    n: "01",
    title: "LinkedIn",
    desc: "Your buyers are on LinkedIn every day. If your profile looks abandoned and your posts get 80 impressions, you are invisible to the exact people who should be buying from you. We fix the profile, write the content, run the outbound, and manage the inbox. You show up to calls.",
  },
  {
    n: "02",
    title: "Reddit",
    desc: "Your ICP is on Reddit right now asking questions your product answers. Nobody is there representing you. We participate in the right communities, answer the right threads, and make sure when someone searches for your solution, your name comes up. Naturally. Not spammily.",
  },
  {
    n: "03",
    title: "Twitter / X",
    desc: "Twitter still moves fast in B2B SaaS. A single thread from the right founder can do more pipeline in 24 hours than a month of cold email. We build your presence, write in your voice, and make sure you are part of the conversations your buyers are having.",
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
          <SectionLabel>Founder-led distribution</SectionLabel>
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
            Your product works. Nobody knows it exists.
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
            Most B2B SaaS founders build for 12 months and distribute for 12 days.
            We fix that. We build your distribution presence on LinkedIn, Reddit,
            and Twitter so your buyers find you before you have to find them.
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
                  lineHeight: 1.08,
                  color: "#0d0d0d",
                  margin: "18px 0 0",
                  maxWidth: "18ch",
                }}
              >
                What happens when distribution actually runs.
              </h2>
              <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#6b7280", margin: "16px 0 0" }}>
                Not impressions for vanity. Pipeline for revenue.
              </p>
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
          <div className="max-w-[680px]" data-reveal>
            <SectionLabel>What we do</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#0d0d0d",
                margin: "18px 0 0",
              }}
            >
              Three channels. One system. Run by us.
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.65,
                color: "#6b7280",
                margin: "16px 0 0",
              }}
            >
              LinkedIn, Reddit, and Twitter are where your buyers live. We build
              your presence there so you compound instead of cold pitching forever.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {services.map((s) => (
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

                <div style={{ borderTop: "1px solid #dfe3e0", paddingTop: 20 }}>
                  <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "56ch" }}>
                    {s.desc}
                  </p>
                </div>
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
          <FounderPhoto />
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
              I built this because I kept seeing the same thing.
            </h2>
            <div className="mt-7 space-y-5" style={{ maxWidth: "56ch" }}>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                Great product. Dead pipeline. Founder posting into the void and
                wondering why nobody was showing up.
              </p>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                I am Vanshika. I understand SaaS and I understand distribution.
                Most people understand one or the other. I built TDL in the gap.
              </p>
              <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                We work with seed to Series A B2B SaaS founders. First month is
                Rs. 30,000. We prove it works before we talk about what comes next.
                US, UK, UAE.
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

      {/* FAQ */}
      <section style={{ background: "#ffffff", padding: "clamp(80px,12vh,120px) 24px" }}>
        <div className="mx-auto max-w-[820px]">
          <div data-reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#0d0d0d",
                margin: "18px 0 40px",
              }}
            >
              Questions founders actually ask.
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <FooterCta />
    </>
  );
}
