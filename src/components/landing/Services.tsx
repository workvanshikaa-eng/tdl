import SectionLabel from "./SectionLabel";

const cards = [
  {
    title: "Get Pipeline",
    body: "Targeted outreach and a profile that works like a sales rep, filling your calendar with qualified conversations.",
  },
  {
    title: "Get Visible",
    body: "Daily content in your founder voice that builds trust at scale, so buyers know you before the first call.",
  },
  {
    title: "Get Found",
    body: "Rank for the searches your buyers make and show up in the AI answers that now shape every decision.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <SectionLabel>What we do</SectionLabel>

        <div className="mt-10 grid gap-6 min-[721px]:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              style={{ background: "#f9fafb", borderRadius: 16, padding: 36 }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "#0d0d0d",
                  margin: 0,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#374151",
                  margin: "14px 0 0",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
