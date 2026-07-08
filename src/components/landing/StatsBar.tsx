const stats = [
  { value: "115K", label: "impressions" },
  { value: "7-8", label: "calls booked per week" },
  { value: "198K", label: "impressions in 28 days" },
];

export default function StatsBar() {
  return (
    <section style={{ background: "#ffffff", padding: "clamp(80px,10vw,120px) 24px" }}>
      <div className="mx-auto max-w-[1080px]">
        <div className="grid grid-cols-3 gap-10 max-[720px]:grid-cols-1 max-[720px]:gap-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#0d0d0d",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "12px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
