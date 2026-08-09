const stats = [
  { value: "240,677", label: "Impressions in 4 months" },
  { value: "2,654%", label: "Growth vs prior period" },
  { value: "35+", label: "Meetings booked per month" },
];

export default function StatsBar() {
  return (
    <section style={{ background: "#064e3b", padding: "80px 24px" }}>
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] grid-cols-3 max-[720px]:grid-cols-1 max-[720px]:gap-12"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${i > 0 ? "min-[721px]:border-l min-[721px]:border-[rgba(255,255,255,0.14)]" : ""}`}
          >
            <div
              style={{
                fontSize: "clamp(44px,7vw,64px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              {s.value}
            </div>
            <div
              className="uppercase"
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
                marginTop: "16px",
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
