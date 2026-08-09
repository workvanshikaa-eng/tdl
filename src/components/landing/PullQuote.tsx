import Spark from "./Spark";

export default function PullQuote() {
  return (
    <section style={{ background: "#064e3b", padding: "130px 24px" }}>
      <div className="mx-auto max-w-[820px] text-center" data-reveal>
        <div className="mb-8 flex justify-center">
          <Spark size={16} color="#7fd1b4" />
        </div>
        <p
          style={{
            fontSize: "clamp(24px,3.6vw,38px)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Your product is not the reason founders stay unknown. Their
          distribution is.
        </p>
      </div>
    </section>
  );
}
