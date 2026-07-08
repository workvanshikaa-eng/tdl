const numbers = [
  { value: "198,434", label: "impressions" },
  { value: "28", label: "days" },
  { value: "Zero", label: "ad spend" },
];

export default function CaseStudy() {
  return (
    <section
      id="results"
      style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}
    >
      <div className="mx-auto max-w-[900px] text-center">
        <div className="grid grid-cols-3 gap-10 max-[640px]:grid-cols-1 max-[640px]:gap-12">
          {numbers.map((n) => (
            <div key={n.label}>
              <div
                style={{
                  fontSize: "clamp(44px,6vw,60px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#0d0d0d",
                }}
              >
                {n.value}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "12px" }}>
                {n.label}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#374151",
            margin: "48px auto 0",
            maxWidth: "48ch",
          }}
        >
          AI HR SaaS founder. First paying customer came through inbound.
        </p>
      </div>
    </section>
  );
}
