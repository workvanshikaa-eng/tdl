import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}
    >
      <div className="mx-auto grid max-w-[1080px] items-center gap-14 min-[721px]:grid-cols-[0.8fr_1.1fr]">
        {/* Photo */}
        <div
          style={{
            aspectRatio: "4 / 5",
            borderRadius: 16,
            background: "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9aa9a2",
            fontSize: "13px",
            overflow: "hidden",
          }}
        >
          {/* Replace this placeholder with a real photo: drop the file in
              /public and swap this block for <img src="/vanshika.jpg" .../> */}
          Vanshika
        </div>

        {/* Copy */}
        <div>
          <SectionLabel>About</SectionLabel>
          <p
            style={{
              fontSize: "clamp(19px,2.4vw,24px)",
              lineHeight: 1.6,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "#0d0d0d",
              margin: "24px 0 0",
              maxWidth: "40ch",
            }}
          >
            Hi, I&apos;m Vanshika. For the last two years I&apos;ve built
            distribution for B2B SaaS founders with real products and quiet
            pipelines. You work with me directly, on every call and every
            decision.
          </p>
        </div>
      </div>
    </section>
  );
}
