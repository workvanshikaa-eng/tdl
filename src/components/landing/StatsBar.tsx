const stats = [
  { value: "240,677", label: "Impressions in 4 months" },
  { value: "2,654%", label: "Growth vs prior period" },
  { value: "35+", label: "Meetings booked per month" },
];

export default function StatsBar() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "64px 24px",
        borderTop: "1px solid #eceeec",
        borderBottom: "1px solid #eceeec",
      }}
    >
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] grid-cols-3 max-[720px]:grid-cols-1 max-[720px]:gap-10"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${i > 0 ? "min-[721px]:border-l min-[721px]:border-[#eceeec]" : ""}`}
          >
            <div
              style={{
                fontSize: "clamp(40px,5vw,54px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#064e3b",
              }}
            >
              {s.value}
            </div>
            <div
              className="uppercase"
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.14em",
                color: "#6b7280",
                marginTop: "14px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
