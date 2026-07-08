const stats = [
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
    format: null,
    suffix: "",
    caption: "sales calls booked per week",
  },
];

export default function StatsBar() {
  return (
    <section
      className="bg-transparent"
      style={{ padding: "clamp(80px,10vw,120px) 24px" }}
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="grid grid-cols-3 gap-8 max-[720px]:grid-cols-1 max-[720px]:gap-12">
          {stats.map((s, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-delay={i * 90}
              className="text-center max-[720px]:text-center"
            >
              <div
                className="font-bold text-[#064e3b]"
                style={{
                  fontSize: "clamp(52px,7vw,76px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
                {...(s.countup
                  ? {
                      "data-countup": s.countup,
                      "data-format": s.format ?? undefined,
                      "data-suffix": s.suffix || undefined,
                    }
                  : {})}
              >
                {s.value}
              </div>
              <div
                className="mx-auto mt-4 text-[15px] font-medium text-[#56685f]"
                style={{ maxWidth: "20ch" }}
              >
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
