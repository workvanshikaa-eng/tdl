import FooterCta from "@/components/landing/FooterCta";

export const metadata = { title: "Work" };

const cases = [
  {
    label: "LinkedIn Management",
    client: "AI HR SaaS (name withheld, NDA)",
    metrics: ["198,434 impressions", "3,388% growth", "5+ calls per week"],
    body: "Full LinkedIn management from scratch. Content, outbound, engagement. First paying customer came through inbound while we were live. Zero ad spend.",
  },
  {
    label: "Content and Distribution",
    client: "Mockzy (mockzy.app)",
    metrics: ["50,000+ organic reach", "0 ad spend", "0 influencers"],
    body: "Product was at under 100 impressions per post. We engineered a content architecture around the build-in-public community. It compounded fast.",
  },
  {
    label: "Community and Distribution",
    client: "Sked Club (sked.club)",
    metrics: ["High-intent lead collection", "Community building", "0 ad spend"],
    body: "Shifted from generic product updates to intent-first transparency posts. Validation followed. Real users, real feedback, real signal.",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#ffffff", padding: "120px 24px 80px" }}>
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
            Work that compounds.
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "22px 0 0",
              maxWidth: "60ch",
            }}
          >
            Every engagement is built around one goal, results that keep growing
            after the work is done.
          </p>
        </div>
      </section>

      {/* Cases */}
      <section style={{ background: "#ffffff", padding: "0 24px 100px" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="grid gap-8">
            {cases.map((c, i) => (
              <div
                key={c.client}
                data-reveal
                data-reveal-delay={i * 80}
                className="tdl-card"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderTop: "4px solid #064e3b",
                  borderRadius: 8,
                  padding: 40,
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a7c5c" }}>
                  {c.label}
                </div>
                <div style={{ fontSize: "20px", fontWeight: 600, color: "#0d0d0d", margin: "10px 0 0" }}>
                  {c.client}
                </div>

                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {c.metrics.map((m) => (
                    <div
                      key={m}
                      style={{ fontSize: "18px", fontWeight: 600, color: "#064e3b", letterSpacing: "-0.01em" }}
                    >
                      {m}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: "24px 0 0", maxWidth: "70ch" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="text-center"
            style={{ fontSize: "14px", fontStyle: "italic", color: "#6b7280", margin: "40px 0 0" }}
          >
            More results available on request.
          </p>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
