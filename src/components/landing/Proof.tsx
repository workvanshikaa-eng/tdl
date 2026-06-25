import SectionLabel from "./SectionLabel";

export default function Proof() {
  return (
    <section
      id="proof"
      className="bg-[#FAF8F4]"
      style={{ padding: "clamp(58px,7vw,92px) 28px" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel>Proof</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-extrabold"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            fontSize: "clamp(25px,3vw,36px)",
            margin: "22px 0 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          Numbers from one week. One founder. One engine.
        </h2>

        <div
          className="mt-12 grid items-stretch gap-[18px]"
          style={{ gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)" }}
        >
          {/* Chart card */}
          <div
            data-reveal
            className="rounded-[22px] border border-[#E8F2EE] bg-white"
            style={{ padding: "clamp(24px,3vw,34px)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[14px] font-semibold text-[#41584f]">
                  Content performance · Impressions
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span
                    data-countup="115009"
                    data-format="comma"
                    className="font-extrabold text-[#064e3b]"
                    style={{
                      fontSize: "clamp(32px,4vw,46px)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    0
                  </span>
                  <span className="inline-flex items-center gap-[5px] rounded-full bg-[#E8F2EE] px-2.5 py-[5px] text-[14px] font-bold text-[#0a6b54]">
                    ▲ +955%
                  </span>
                </div>
                <div className="mt-1.5 text-[13px] text-[#7c8c85]">
                  cumulative, May 19 – May 26
                </div>
              </div>
            </div>

            <div className="relative mt-6">
              <svg
                viewBox="0 0 700 360"
                width="100%"
                style={{ display: "block", overflow: "visible" }}
              >
                {/* gridlines */}
                <line x1="70" y1="320" x2="660" y2="320" stroke="#E8F2EE" strokeWidth="1.5" />
                <line x1="70" y1="223" x2="660" y2="223" stroke="#E8F2EE" strokeWidth="1.5" />
                <line x1="70" y1="127" x2="660" y2="127" stroke="#E8F2EE" strokeWidth="1.5" />
                <line x1="70" y1="30" x2="660" y2="30" stroke="#E8F2EE" strokeWidth="1.5" />
                {/* y labels */}
                <text x="58" y="324" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">0</text>
                <text x="58" y="227" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">50K</text>
                <text x="58" y="131" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">100K</text>
                <text x="58" y="34" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">150K</text>
                {/* x labels */}
                <text x="70" y="344" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">May 19</text>
                <text x="238" y="344" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">May 21</text>
                <text x="407" y="344" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">May 23</text>
                <text x="660" y="344" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9aaaa3">May 26</text>
                {/* area */}
                <path
                  data-chart-area
                  d="M70,310 C110,250 130,225 154,204 C190,178 210,162 238,150 C275,135 295,130 323,125 C360,118 380,114 407,112 C470,107 520,104 576,102 C610,100 640,99 660,98 L660,320 L70,320 Z"
                  fill="url(#tdlgrad)"
                  opacity="0"
                />
                {/* line */}
                <path
                  data-chart-line
                  d="M70,310 C110,250 130,225 154,204 C190,178 210,162 238,150 C275,135 295,130 323,125 C360,118 380,114 407,112 C470,107 520,104 576,102 C610,100 640,99 660,98"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle data-chart-dot cx="660" cy="98" r="6" fill="#10b981" stroke="#fff" strokeWidth="2.5" opacity="0" />
                <defs>
                  <linearGradient id="tdlgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Stat stack */}
          <div className="flex flex-col gap-[18px]">
            <div
              data-reveal
              data-reveal-delay="80"
              className="flex flex-1 flex-col justify-center rounded-[22px] bg-[#064e3b] text-white"
              style={{ padding: "clamp(24px,3vw,32px)" }}
            >
              <div
                className="font-extrabold"
                style={{
                  fontSize: "clamp(34px,4.4vw,48px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                7–8
              </div>
              <div className="mt-2.5 text-[15px] font-medium text-[rgba(255,255,255,0.72)]">
                qualified sales calls booked in a single week
              </div>
            </div>
            <div
              data-reveal
              data-reveal-delay="160"
              className="flex flex-1 flex-col justify-center rounded-[22px] border border-[#E8F2EE] bg-white"
              style={{ padding: "clamp(24px,3vw,32px)" }}
            >
              <div
                className="font-extrabold text-[#064e3b]"
                style={{
                  fontSize: "clamp(34px,4.4vw,48px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                <span data-countup="955" data-prefix="+" data-suffix="%">
                  +0%
                </span>
              </div>
              <div className="mt-2.5 text-[15px] font-medium text-[#41584f]">
                jump in reach versus the previous 8 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
