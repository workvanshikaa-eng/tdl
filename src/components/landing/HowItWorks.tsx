import SectionLabel from "./SectionLabel";

const steps = [
  {
    title: "Audit",
    body: "We pull apart your current distribution, positioning, and channels. You get the unfiltered truth in week one.",
  },
  {
    title: "Strategy",
    body: "A distribution plan built around your ICP and founder voice. Built for you, not pulled from a template.",
  },
  {
    title: "Execution",
    body: "We build and run it. Content, outreach, ads, and SEO, shipped weekly and optimized monthly.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <SectionLabel>How it works</SectionLabel>

        <div className="mt-12 grid gap-x-12 gap-y-14 min-[721px]:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <div style={{ fontSize: "14px", color: "#9aa9a2", fontWeight: 600 }}>
                0{i + 1}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#0d0d0d",
                  margin: "12px 0 0",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#374151",
                  margin: "12px 0 0",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#6b7280",
            margin: "56px 0 0",
            maxWidth: "48ch",
          }}
        >
          Every engagement is run by me. No account managers, no hand-offs.
        </p>
      </div>
    </section>
  );
}
