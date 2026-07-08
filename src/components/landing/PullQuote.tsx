export default function PullQuote() {
  return (
    <section
      style={{
        background: "#064e3b",
        padding: "clamp(120px,15vw,180px) 24px",
      }}
    >
      <div className="mx-auto max-w-[780px] text-center">
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
          Marketing is a tax for being boring. Distribution is an asset for being
          smart.
        </p>
      </div>
    </section>
  );
}
