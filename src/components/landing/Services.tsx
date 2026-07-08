import SectionLabel from "./SectionLabel";

const cards = [
  {
    n: "01",
    outcome: "Get Pipeline",
    services: "LinkedIn lead gen + outbound",
    body: "Targeted outreach and a profile that works like a sales rep, filling your calendar with qualified conversations instead of vanity likes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
      </svg>
    ),
  },
  {
    n: "02",
    outcome: "Get Visible",
    services: "LinkedIn personal branding + content",
    body: "Daily content in your founder voice that builds trust at scale, so buyers already know and rate you before the first call.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    n: "03",
    outcome: "Get Found",
    services: "SEO + AEO + Reddit + Twitter",
    body: "Rank for the searches your buyers make and show up where they research, including the AI answers that now shape every buying decision.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-transparent"
      style={{ padding: "clamp(88px,11vw,140px) 24px" }}
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionLabel>What we do</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-bold"
          style={{
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            fontSize: "clamp(30px,4vw,52px)",
            margin: "22px 0 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          Three outcomes. One distribution engine.
        </h2>
        <p
          className="mt-5 text-[17px] leading-[1.55] text-[#56685f]"
          style={{ maxWidth: "50ch" }}
        >
          Not a menu of services to pick from. One system built around the result
          you actually want.
        </p>

        <div
          className="mt-14 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
        >
          {cards.map((c, i) => (
            <div
              key={c.n}
              data-reveal
              data-reveal-delay={i * 100}
              className="flex flex-col rounded-[22px] border border-[#e4ece8] bg-white p-9 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#bfe0d3]"
              style={{ boxShadow: "0 2px 10px rgba(6,78,59,0.04)" }}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#064e3b] text-white">
                  {c.icon}
                </span>
                <span className="text-[13px] font-semibold text-[#b0c4bb]">
                  {c.n}
                </span>
              </div>
              <h3
                className="mt-7 font-bold text-[#064e3b]"
                style={{ fontSize: "clamp(24px,2.6vw,30px)", letterSpacing: "-0.02em" }}
              >
                {c.outcome}
              </h3>
              <div className="mt-1.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0a6b54]">
                {c.services}
              </div>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#56685f]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
