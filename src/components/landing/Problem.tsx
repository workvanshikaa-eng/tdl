import SectionLabel from "./SectionLabel";

export default function Problem() {
  return (
    <section style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}>
      <div className="mx-auto max-w-[780px]">
        <SectionLabel>The problem</SectionLabel>
        <p
          style={{
            fontSize: "clamp(22px,2.8vw,30px)",
            lineHeight: 1.55,
            fontWeight: 500,
            letterSpacing: "-0.015em",
            color: "#0d0d0d",
            margin: "28px 0 0",
          }}
        >
          You built a product people genuinely need, but almost nobody hears
          about it. A few scattered posts, a cold list nobody opens, and a
          freelancer here and there add up to silence.
        </p>
      </div>
    </section>
  );
}
