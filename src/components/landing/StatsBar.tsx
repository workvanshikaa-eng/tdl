const stats = [
  { value: "198,434", label: "impressions in 28 days" },
  { value: "5+", label: "sales calls booked per week" },
  { value: "3,388%", label: "growth vs prior month" },
];

export default function StatsBar() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "60px 24px",
        borderTop: "1px solid #f3f4f6",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] grid-cols-3 max-[720px]:grid-cols-1 max-[720px]:gap-10"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${i > 0 ? "min-[721px]:border-l min-[721px]:border-[#f3f4f6]" : ""}`}
          >
            <div
              style={{
                fontSize: "44px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#064e3b",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "10px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
