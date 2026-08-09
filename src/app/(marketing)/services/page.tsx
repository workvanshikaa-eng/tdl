import SectionLabel from "@/components/landing/SectionLabel";
import ChannelPills from "@/components/landing/ChannelPills";
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
      {/* Block 1: channel pills */}
      <section style={{ background: "#f5f5f0", padding: "120px 24px 40px" }}>
        <div className="mx-auto max-w-[1200px]" data-reveal>
          <SectionLabel num="01">Services</SectionLabel>
          <div className="mt-8">
            <ChannelPills />
          </div>
        </div>
      </section>

      {/* Block 2: full accordion */}
      <section style={{ background: "#f5f5f0", padding: "70px 24px 100px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
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
              One system. Three outcomes.
            </h1>
            <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#6b7280", margin: "22px 0 0", maxWidth: "56ch" }}>
              We handle the full distribution stack so you can focus on building the
              product.
            </p>
          </div>
          <div className="mt-12">
            <ServicesAccordion />
          </div>
        </div>
      </section>

      {/* How we work */}
      <section style={{ background: "#f9fafb", padding: "100px 24px" }}>
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal>
            <SectionLabel num="02">How we work</SectionLabel>
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
