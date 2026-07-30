export default function PullQuote() {
  return (
    <section style={{ background: "#064e3b", padding: "120px 24px" }}>
      <div className="mx-auto max-w-[680px] text-center" data-reveal>
        <p
          style={{
            fontSize: "clamp(22px,3vw,28px)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Marketing is a tax you pay for being boring. Distribution is an asset
          you build for being smart.
        </p>
      </div>
    </section>
  );
}
