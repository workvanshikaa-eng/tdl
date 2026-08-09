import SectionLabel from "@/components/landing/SectionLabel";
import ServicesAccordion from "@/components/landing/ServicesAccordion";
import FooterCta from "@/components/landing/FooterCta";

export const metadata = { title: "Services" };

const steps = [
  { n: "Step 1", title: "We audit", desc: "We look at your product, your ICP, and your current channels. We find the gaps." },
  { n: "Step 2", title: "We build", desc: "We build the distribution system from scratch. Content, outbound, SEO, community, whatever your stage needs." },
  { n: "Step 3", title: "We compound", desc: "Month one builds the foundation. Month three it starts to compound. Month six it runs." },
];

export default function ServicesPage() {
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
            Three channels. One system. Run by us.
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#6b7280", margin: "22px 0 0", maxWidth: "56ch" }}>
            LinkedIn, Reddit, and Twitter are where your buyers live. We build your
            presence there so you compound instead of cold pitching forever.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section style={{ background: "#ffffff", padding: "0 24px 100px" }}>
        <div className="mx-auto max-w-[1200px]">
          <ServicesAccordion />
        </div>
      </section>

      {/* How we work */}
      <section style={{ background: "#f9fafb", padding: "100px 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
            <SectionLabel>How we work</SectionLabel>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-14 min-[721px]:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} data-reveal data-reveal-delay={i * 90}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a7c5c" }}>{s.n}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#0d0d0d", margin: "12px 0 0" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#374151", margin: "12px 0 0" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCta />
    </>
  );
}
