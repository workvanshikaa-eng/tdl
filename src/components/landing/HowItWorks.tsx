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
    body: "We build and run it. Content, outreach, ads, SEO — shipped weekly, optimized monthly.",
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
      style={{ padding: "clamp(58px,7vw,92px) 28px" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel>How it works</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-extrabold"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            fontSize: "clamp(25px,3vw,36px)",
            margin: "22px 0 0",
            maxWidth: "16ch",
            textWrap: "balance",
          }}
        >
          Three steps. One person. Yours.
        </h2>

        <div
          className="mt-12 grid gap-[18px]"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              data-reveal
              data-reveal-delay={s.delay}
              className="rounded-[20px] border border-[#E8F2EE] bg-white p-[34px]"
            >
              <div className="flex items-center gap-3.5">
                <span className="inline-flex h-12 w-12 flex-[0_0_auto] items-center justify-center rounded-[14px] bg-[#064e3b] text-white">
                  {s.icon}
                </span>
                <span className="font-mono text-[13px] text-[#9bb3a8]">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-[#E8F2EE]" />
              </div>
              <h3 className="mt-4 text-[19px] font-extrabold tracking-[-0.02em] text-[#064e3b]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.5] text-[#566f66]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          data-reveal-delay="120"
          className="mt-[18px] flex flex-wrap items-center justify-between gap-[18px] rounded-[20px] bg-[#064e3b]"
          style={{ padding: "clamp(28px,3.4vw,40px)" }}
        >
          <p
            className="m-0 max-w-[28ch] font-bold text-white"
            style={{
              fontSize: "clamp(17px,1.8vw,21px)",
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            Every engagement is run by me. No account managers. No hand-offs.
          </p>
          <span className="whitespace-nowrap font-mono text-[12px] text-[#6ee7b7]">
            — founder-led, always
          </span>
        </div>
      </div>
    </section>
  );
}
