import SectionLabel from "./SectionLabel";

const cases = [
  {
    client: "AI HR SaaS (name withheld)",
    stat: "198,434 impressions",
    subStat: "28 days. Zero ad spend.",
    outcome: "First paying customer came through inbound while we were live.",
  },
  {
    client: "Mockzy",
    stat: "50,000+ organic reach",
    subStat: "0 ad spend. 0 influencers.",
    outcome:
      "Product was at under 100 impressions. We fixed the narrative. It compounded.",
  },
  {
    client: "Sked Club",
    stat: "High-intent lead collection",
    subStat: "Community building. 0 ad spend.",
    outcome:
      "Shifted from product updates to intent-first posts. Validation followed.",
  },
];

export default function Work() {
  return (
    <section id="work" style={{ background: "#ffffff", padding: "100px 24px" }}>
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
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "14px 0 0",
              maxWidth: "52ch",
            }}
          >
            We do not run campaigns. We build distribution systems that compound.
          </p>
        </div>

        <div className="mt-14 grid gap-6 min-[861px]:grid-cols-3">
          {cases.map((c, i) => (
            <div
              key={c.client}
              data-reveal
              data-reveal-delay={i * 90}
              className="tdl-card flex flex-col"
              style={{
                background: "#f9fafb",
                borderRadius: 8,
                borderTop: "3px solid #064e3b",
                padding: 32,
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>
                {c.client}
              </div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "#064e3b",
                  margin: "18px 0 0",
                  lineHeight: 1.2,
                }}
              >
                {c.stat}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", margin: "8px 0 0" }}>
                {c.subStat}
              </div>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "#374151",
                  margin: "20px 0 0",
                }}
              >
                {c.outcome}
              </p>
            </div>
          ))}
        </div>

        <p
          data-reveal
          style={{
            fontSize: "15px",
            fontStyle: "italic",
            color: "#6b7280",
            margin: "32px 0 0",
          }}
        >
          More results available on request.
        </p>
      </div>
    </section>
  );
}
