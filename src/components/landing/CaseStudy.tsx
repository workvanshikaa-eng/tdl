import SectionLabel from "./SectionLabel";

const metrics = [
  {
    value: "198,434",
    countup: "198434",
    format: "comma" as const,
    suffix: "",
    caption: "impressions in 28 days",
  },
  {
    value: "3,388%",
    countup: "3388",
    format: "comma" as const,
    suffix: "%",
    caption: "jump vs the prior month",
  },
  {
    value: "5+",
    countup: null,
    caption: "sales calls booked per week",
  },
];

export default function CaseStudy() {
  return (
    <section
      id="results"
      className="bg-transparent"
      style={{ padding: "clamp(88px,11vw,140px) 24px" }}
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Case study</SectionLabel>
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
              From invisible to inbound in 28 days.
            </h2>
            <p className="mt-4 text-[16px] text-[#56685f]">
              Client: AI HR SaaS (name withheld).
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#bfe0d3] bg-[#eefaf4] px-4 py-2 text-[14px] font-semibold text-[#0a6b54]">
            <span className="h-2 w-2 rounded-full bg-[#10b981]" />
            Zero ad spend
          </span>
        </div>

        {/* Numbers */}
        <div
          data-reveal
          data-reveal-delay="120"
          className="mt-12 grid grid-cols-3 gap-8 rounded-[24px] border border-[#e4ece8] bg-white p-10 max-[720px]:grid-cols-1 max-[720px]:gap-10"
          style={{ boxShadow: "0 2px 10px rgba(6,78,59,0.04)" }}
        >
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div
                className="font-bold text-[#064e3b]"
                style={{
                  fontSize: "clamp(48px,6.5vw,72px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
                {...(m.countup
                  ? {
                      "data-countup": m.countup,
                      "data-format": m.format,
                      "data-suffix": m.suffix || undefined,
                    }
                  : {})}
              >
                {m.value}
              </div>
              <div className="mx-auto mt-4 text-[15px] font-medium text-[#56685f]" style={{ maxWidth: "20ch" }}>
                {m.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Qualitative headline win */}
        <div
          data-reveal
          data-reveal-delay="180"
          className="mt-6 flex items-center gap-4 rounded-[20px] border border-[#e4ece8] bg-white px-8 py-7"
        >
          <span className="inline-flex h-11 w-11 flex-[0_0_auto] items-center justify-center rounded-full bg-[#064e3b] text-[#6ee7b7]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p
            className="m-0 font-bold text-[#0f2e25]"
            style={{ fontSize: "clamp(18px,2.2vw,24px)", letterSpacing: "-0.02em" }}
          >
            First paying customer landed from inbound.
          </p>
        </div>
      </div>
    </section>
  );
}
