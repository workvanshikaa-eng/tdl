import SectionLabel from "./SectionLabel";

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "We pull apart your current distribution, positioning, and channels. You get the unfiltered truth in week one.",
    delay: 60,
    icon: (
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3h6v1" />
        <path d="m9.5 13 1.8 1.8L15 11" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Strategy",
    body: "A distribution plan built around your ICP and your founder voice. Built for you, not pulled from a template.",
    delay: 140,
    icon: (
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m16 8-5 3-3 5 5-3 3-5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Execution",
    body: "We build and run it. Content, outreach, ads, and SEO, shipped weekly and optimized monthly.",
    delay: 220,
    icon: (
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="bg-transparent"
      style={{ padding: "clamp(88px,11vw,140px) 24px" }}
    >
      <div className="mx-auto max-w-[1120px]">
        <SectionLabel>How it works</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-bold"
          style={{
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            fontSize: "clamp(30px,4vw,52px)",
            margin: "22px 0 0",
            maxWidth: "16ch",
            textWrap: "balance",
          }}
        >
          Three steps. One person. Yours.
        </h2>

        <div
          className="mt-14 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              data-reveal
              data-reveal-delay={s.delay}
              className="rounded-[22px] border border-[#e4ece8] bg-white p-9"
              style={{ boxShadow: "0 2px 10px rgba(6,78,59,0.04)" }}
            >
              <div className="flex items-center gap-3.5">
                <span className="inline-flex h-12 w-12 flex-[0_0_auto] items-center justify-center rounded-[14px] bg-[#064e3b] text-white">
                  {s.icon}
                </span>
                <span className="text-[13px] font-semibold text-[#b0c4bb]">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-[#eef3f0]" />
              </div>
              <h3 className="mt-6 text-[22px] font-bold tracking-[-0.02em] text-[#064e3b]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#56685f]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p
          data-reveal
          data-reveal-delay="120"
          className="mx-auto mt-12 text-center font-semibold text-[#064e3b]"
          style={{ fontSize: "clamp(17px,2vw,22px)", maxWidth: "40ch", letterSpacing: "-0.01em" }}
        >
          Every engagement is run by me. No account managers, no hand-offs.
          Founder-led, always.
        </p>
      </div>
    </section>
  );
}
