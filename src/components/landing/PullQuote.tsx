export default function PullQuote() {
  return (
    <section
      className="tdl-grid-on-dark relative overflow-hidden"
      style={{
        background: "#064e3b",
        color: "#ffffff",
        padding: "clamp(96px,13vw,150px) 24px",
      }}
    >
      <div className="relative mx-auto max-w-[1000px] text-center">
        <p
          data-reveal
          className="font-bold"
          style={{
            fontSize: "clamp(28px,4.4vw,52px)",
            lineHeight: 1.18,
            letterSpacing: "-0.03em",
            textWrap: "balance",
            margin: 0,
          }}
        >
          Marketing is a tax you pay for being{" "}
          <span style={{ color: "#6ee7b7" }}>boring</span>. Distribution is an
          asset you build for being{" "}
          <span style={{ color: "#6ee7b7" }}>smart</span>.
        </p>
      </div>
    </section>
  );
}
