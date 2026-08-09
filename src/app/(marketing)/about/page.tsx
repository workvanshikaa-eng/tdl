import SectionLabel from "@/components/landing/SectionLabel";
import FounderPhoto from "@/components/landing/FounderPhoto";
import FounderSocials from "@/components/landing/FounderSocials";
import FooterCta from "@/components/landing/FooterCta";

export const metadata = { title: "About" };

const story = [
  "I started The Distribution Lab because I kept seeing the same pattern. Great products, invisible companies. Founders who understood their product deeply but had no idea how to make it findable.",
  "I understand tech and I understand distribution. That combination is rarer than it sounds. Most marketers do not understand SaaS. Most SaaS founders do not understand distribution. TDL lives in the gap.",
  "We work with seed to Series A B2B SaaS founders in the US, UK, and UAE. Everything is run by me and a small team. No account managers, no handoffs, no decks without execution.",
  "If you have a product that works and a pipeline that does not, that is exactly who we are built for.",
];

const values = [
  { n: "01", title: "End-to-end execution", desc: "We do not give you a strategy and leave. We run the system." },
  { n: "02", title: "Founder-led", desc: "You talk to the person doing the work. Always." },
  { n: "03", title: "Compound-first", desc: "Every channel we build compounds over time. We do not do short-term campaigns." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#f5f5f0", padding: "120px 24px 80px" }}>
        <div className="mx-auto max-w-[1200px]" data-reveal>
          <h1
            style={{
              fontSize: "clamp(38px,5.4vw,52px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
            }}
          >
            We build distribution systems.
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#6b7280", margin: "22px 0 0", maxWidth: "50ch" }}>
            Not campaigns. Not one-off posts. Systems that compound.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: "#f5f5f0", padding: "40px 24px 100px" }}>
        <div
          data-reveal
          className="mx-auto grid max-w-[1200px] items-start gap-14 min-[861px]:grid-cols-[0.8fr_1.1fr]"
        >
          <FounderPhoto />
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#0d0d0d", margin: 0 }}>
              Vanshika Agarwal, Founder
            </h2>
            <div className="mt-6 space-y-5" style={{ maxWidth: "60ch" }}>
              {story.map((p) => (
                <p key={p} style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
            <FounderSocials className="mt-8" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#f5f5f0", padding: "0 24px 100px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
            <SectionLabel num="01">Values</SectionLabel>
          </div>
          <div className="mx-auto mt-8 max-w-[880px]">
            {values.map((v, i) => (
              <div
                key={v.n}
                data-reveal
                data-reveal-delay={i * 80}
                className="flex items-start gap-5 py-6"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#064e3b", marginTop: 2 }}>{v.n}</span>
                <div className="flex-1">
                  <div style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d" }}>{v.title}</div>
                  <p style={{ fontSize: "16px", lineHeight: 1.65, color: "#6b7280", margin: "6px 0 0", maxWidth: "56ch" }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
