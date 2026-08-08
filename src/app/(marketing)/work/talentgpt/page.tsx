import Link from "next/link";
import SectionLabel from "@/components/landing/SectionLabel";
import FooterCta from "@/components/landing/FooterCta";
import Spark from "@/components/landing/Spark";

export const metadata = {
  title: "TalentGPT Case Study",
  description:
    "How TDL took TalentGPT from invisible to 35+ booked meetings a month, with a 2,654% jump in reach.",
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const heroMetrics = [
  { value: "240,677", label: "Impressions, 4 months" },
  { value: "+2,654%", label: "Growth vs prior period" },
  { value: "94%", label: "Out-of-network reach" },
  { value: "35+", label: "Meetings booked / month" },
];

const strategy = [
  {
    title: "Content shift, not content volume",
    body: "Instead of feature-led posts, we wrote from inside the recruiter's actual frustration. The 'I know who is right but cannot prove it fast enough' problem, the lies hiring managers tell recruiters, the tools-built-for-buyers-not-users argument. Every post had a specific, provable point of view.",
  },
  {
    title: "Consistency over virality",
    body: "We treated reach as a compounding asset, not a one-off swing, posting on a steady cadence so the algorithm had a pattern to reward.",
  },
  {
    title: "Outbound built on inbound trust",
    body: "Structured LinkedIn outreach ran alongside content, targeting senior TA leaders and founders, but landing on people who had often already seen Sahib's posts. That meant warmer replies and faster meetings booked.",
  },
];

const reach = [
  { k: "Impressions (Apr 15 to Aug 8)", v: "240,677" },
  { k: "Growth vs prior period", v: "+2,654%" },
  { k: "People reached", v: "130,157" },
  { k: "Out-of-network reach", v: "94%" },
  { k: "Total followers", v: "4,582 (+268% YoY)" },
];

const engagement = [
  { k: "Total engagements", v: "1,309" },
  { k: "Reactions", v: "1,021" },
  { k: "Comments", v: "188" },
  { k: "Top post", v: "108K impressions, 487 engagements" },
];

const audience = [
  { k: "Senior-level professionals", v: "35 to 39%" },
  { k: "Enterprise (10,001+ employees)", v: "17 to 23%" },
  { k: "IT services / consulting", v: "16 to 18%" },
  { k: "Greater Bengaluru area", v: "15 to 25%" },
];

const pipeline = [
  { k: "April", v: "Low (system launching)" },
  { k: "May", v: "~7+ per week" },
  { k: "June", v: "~7+ per week (sustained)" },
  { k: "July", v: "35+" },
];

function DataTable({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div
          key={r.k}
          className="flex items-baseline justify-between gap-6"
          style={{
            padding: "16px 0",
            borderTop: i === 0 ? "1px solid #dfe3e0" : "none",
            borderBottom: "1px solid #dfe3e0",
          }}
        >
          <span style={{ fontSize: "15px", color: "#374151" }}>{r.k}</span>
          <span
            style={{
              ...mono,
              fontSize: "13px",
              color: "#064e3b",
              whiteSpace: "nowrap",
              textAlign: "right",
            }}
          >
            {r.v}
          </span>
        </div>
      ))}
    </div>
  );
}

function ResultBlock({ label, rows }: { label: string; rows: { k: string; v: string }[] }) {
  return (
    <div data-reveal>
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-6">
        <DataTable rows={rows} />
      </div>
    </div>
  );
}

export default function TalentGptCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#ffffff", padding: "clamp(80px,12vh,120px) 24px 60px" }}>
        <div className="mx-auto max-w-[1000px]" data-reveal>
          <div className="flex items-center gap-4">
            <SectionLabel>Case study / LinkedIn</SectionLabel>
            <Link
              href="/work"
              className="no-underline"
              style={{ ...mono, fontSize: "11px", color: "#9aa9a2" }}
            >
              ← All work
            </Link>
          </div>
          <h1
            style={{
              fontSize: "clamp(38px,6.5vw,72px)",
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#0d0d0d",
              margin: "26px 0 0",
              maxWidth: "18ch",
            }}
          >
            From invisible to 35+ booked meetings a month.
          </h1>
          <p style={{ fontSize: "19px", lineHeight: 1.6, color: "#6b7280", margin: "26px 0 0", maxWidth: "60ch" }}>
            TalentGPT (by PrepNest) is an AI recruiter, Talia, that sources,
            screens, and reaches candidates across 300M+ profiles. Founder Sahib
            Chawla needed LinkedIn to do double duty: build authority in
            recruiting, and generate real pipeline for TalentGPT.
          </p>
        </div>
      </section>

      {/* Hero metrics band */}
      <section style={{ background: "#ffffff", padding: "0 24px 20px" }}>
        <div
          data-reveal
          className="mx-auto grid max-w-[1000px] gap-px overflow-hidden min-[601px]:grid-cols-4"
          style={{ background: "#e3f0ea", border: "1px solid #e3f0ea", borderRadius: 12 }}
        >
          {heroMetrics.map((m) => (
            <div key={m.label} style={{ background: "#f4faf7", padding: "32px 24px" }} className="text-center">
              <div
                style={{
                  fontSize: "clamp(30px,4vw,42px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#064e3b",
                }}
              >
                {m.value}
              </div>
              <div style={{ ...mono, fontSize: "10px", color: "#0a7c5c", marginTop: 12 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The challenge */}
      <section style={{ background: "#ffffff", padding: "clamp(70px,10vh,100px) 24px 0" }}>
        <div className="mx-auto max-w-[720px]" data-reveal>
          <SectionLabel>The challenge</SectionLabel>
          <p style={{ fontSize: "19px", lineHeight: 1.75, color: "#374151", margin: "24px 0 0" }}>
            Before April 15, Sahib's LinkedIn presence was not working for the
            business. Content was inconsistent, reach barely extended past his own
            connections, and the account was not producing meetings or pipeline.
            For an early-stage founder selling into a skeptical, seen-it-all
            recruiter audience, an inactive LinkedIn meant invisible credibility
            and no inbound trust to lean on before outbound even started.
          </p>
        </div>
      </section>

      {/* Strategy */}
      <section style={{ background: "#ffffff", padding: "clamp(70px,10vh,100px) 24px 0" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="max-w-[720px]" data-reveal>
            <SectionLabel>Strategy & solution</SectionLabel>
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
              We rebuilt the account around one insight: recruiters do not want
              another AI pitch, they want to feel understood.
            </p>
          </div>
          <div className="mt-14 space-y-10">
            {strategy.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="grid gap-4 min-[721px]:grid-cols-[0.5fr_1fr] min-[721px]:gap-12"
              >
                <div className="flex items-baseline gap-4">
                  <Spark size={12} />
                  <h3 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "#0d0d0d", margin: 0 }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#374151", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ background: "#f9fafb", padding: "clamp(80px,12vh,120px) 24px", marginTop: "clamp(70px,10vh,100px)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="max-w-[720px]" data-reveal>
            <SectionLabel>The results</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(30px,5vw,52px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#0d0d0d",
                margin: "18px 0 0",
              }}
            >
              Meetings that compounded.
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#6b7280", margin: "18px 0 0" }}>
              The 94% out-of-network number is the one that matters most. It means
              LinkedIn's own algorithm was pushing this content to strangers, not
              recycling it to existing connections. That is earned distribution,
              not paid or borrowed.
            </p>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-14 min-[721px]:grid-cols-2">
            <ResultBlock label="Reach & visibility" rows={reach} />
            <ResultBlock label="Engagement" rows={engagement} />
            <ResultBlock label="Audience quality" rows={audience} />
            <ResultBlock label="Pipeline / meetings booked" rows={pipeline} />
          </div>

          <p
            data-reveal
            style={{ fontSize: "17px", lineHeight: 1.75, color: "#374151", margin: "44px auto 0", maxWidth: "70ch" }}
          >
            Meetings did not just increase, they compounded. April was setup. May
            to June proved the system repeats. July is what happens once
            content-driven trust and outbound outreach start reinforcing each
            other instead of working separately.
          </p>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
