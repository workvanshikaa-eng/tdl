import Link from "next/link";
import FooterCta from "@/components/landing/FooterCta";
import SectionLabel from "@/components/landing/SectionLabel";
import Spark from "@/components/landing/Spark";

export const metadata = { title: "Work" };

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
};

const flagship = {
  label: "LinkedIn management",
  client: "TalentGPT, by PrepNest",
  headline: "From invisible to 35+ booked meetings a month.",
  metrics: ["240,677 impressions", "+2,654% growth", "94% out-of-network", "35+ meetings / month"],
  body: "Rebuilt founder Sahib Chawla's LinkedIn around recruiter frustration, not feature pitches. Content and outbound run as one system. Meetings compounded from a standing start to 35+ a month.",
  href: "/work/talentgpt",
};

const cases = [
  {
    label: "LinkedIn management",
    client: "AI HR SaaS (name withheld, NDA)",
    metrics: ["198,434 impressions", "3,388% growth", "5+ calls per week"],
    body: "Full LinkedIn management from scratch. Content, outbound, engagement. First paying customer came through inbound while we were live. Zero ad spend.",
  },
  {
    label: "Content and distribution",
    client: "Mockzy (mockzy.app)",
    metrics: ["50,000+ organic reach", "0 ad spend", "0 influencers"],
    body: "Product was at under 100 impressions per post. We engineered a content architecture around the build-in-public community. It compounded fast.",
  },
  {
    label: "Community and distribution",
    client: "Sked Club (sked.club)",
    metrics: ["High-intent leads", "Community building", "0 ad spend"],
    body: "Shifted from generic product updates to intent-first transparency posts. Validation followed. Real users, real feedback, real signal.",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#ffffff", padding: "clamp(80px,12vh,120px) 24px 60px" }}>
        <div className="mx-auto max-w-[1200px]" data-reveal>
          <SectionLabel>Selected work</SectionLabel>
          <h1
            style={{
              fontSize: "clamp(40px,7vw,80px)",
              fontWeight: 600,
              lineHeight: 1.03,
              letterSpacing: "-0.035em",
              color: "#0d0d0d",
              margin: "26px 0 0",
            }}
          >
            Work that compounds.
          </h1>
          <p style={{ fontSize: "19px", lineHeight: 1.6, color: "#6b7280", margin: "26px 0 0", maxWidth: "58ch" }}>
            Every engagement is built around one goal, results that keep growing
            after the work is done.
          </p>
        </div>
      </section>

      {/* Flagship case */}
      <section style={{ background: "#ffffff", padding: "0 24px clamp(60px,8vh,80px)" }}>
        <Link
          href={flagship.href}
          data-reveal
          className="group mx-auto block max-w-[1200px] overflow-hidden no-underline"
          style={{ borderRadius: 16, border: "1px solid #e3f0ea", background: "#f4faf7" }}
        >
          <div className="grid min-[861px]:grid-cols-2">
            <div
              className="flex flex-col justify-center gap-6"
              style={{ background: "linear-gradient(135deg,#e6f4ef 0%,#d4ebe1 100%)", padding: "clamp(36px,5vw,56px)" }}
            >
              {flagship.metrics.map((m) => (
                <div
                  key={m}
                  style={{
                    fontSize: "clamp(22px,2.6vw,30px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#064e3b",
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
            <div style={{ padding: "clamp(36px,5vw,56px)" }}>
              <div className="flex items-center gap-2" style={{ ...mono, fontSize: "11px", color: "#0a7c5c" }}>
                <Spark size={10} /> {flagship.label}
              </div>
              <div style={{ ...mono, fontSize: "11px", color: "#6b7280", marginTop: 10 }}>{flagship.client}</div>
              <h2
                style={{
                  fontSize: "clamp(26px,3.4vw,38px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "#0d0d0d",
                  margin: "18px 0 0",
                }}
              >
                {flagship.headline}
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: "18px 0 0" }}>{flagship.body}</p>
              <span
                className="mt-7 inline-flex items-center gap-1.5 no-underline"
                style={{ ...mono, fontSize: "12px", color: "#064e3b" }}
              >
                Read the case study →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Other cases */}
      <section style={{ background: "#ffffff", padding: "0 24px clamp(80px,12vh,120px)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 min-[721px]:grid-cols-3">
            {cases.map((c, i) => (
              <div
                key={c.client}
                data-reveal
                data-reveal-delay={i * 80}
                className="tdl-card flex flex-col"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderTop: "4px solid #064e3b",
                  borderRadius: 10,
                  padding: 32,
                }}
              >
                <div style={{ ...mono, fontSize: "11px", color: "#0a7c5c" }}>{c.label}</div>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d", margin: "12px 0 0" }}>
                  {c.client}
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  {c.metrics.map((m) => (
                    <div key={m} style={{ fontSize: "17px", fontWeight: 600, color: "#064e3b", letterSpacing: "-0.01em" }}>
                      {m}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#374151", margin: "18px 0 0" }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="text-center"
            style={{ ...mono, fontSize: "11px", color: "#9aa9a2", margin: "44px 0 0" }}
          >
            More results available on request
          </p>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
