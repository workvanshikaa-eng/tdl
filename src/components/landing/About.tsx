import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section id="about" style={{ background: "#ffffff", padding: "100px 24px" }}>
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] items-center gap-14 min-[861px]:grid-cols-[0.8fr_1.1fr]"
      >
        {/* Photo */}
        <div
          style={{
            aspectRatio: "4 / 5",
            borderRadius: 8,
            background: "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9aa9a2",
            fontSize: "13px",
            overflow: "hidden",
          }}
        >
          {/* Drop a real photo in /public and swap this for
              <img src="/vanshika.jpg" alt="Vanshika Agarwal" /> */}
          Vanshika Agarwal
        </div>

        {/* Copy */}
        <div>
          <SectionLabel>About</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: "16px 0 0",
            }}
          >
            Built by a founder, for founders.
          </h2>

          <div className="mt-6 space-y-5" style={{ maxWidth: "56ch" }}>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
              The Distribution Lab is run by Vanshika Agarwal. She started TDL
              because she understood tech and distribution before she understood
              how rare that combination is.
            </p>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
              Most agencies hand you a strategy deck. We run the system. Content,
              outbound, SEO, Reddit, Twitter, we execute all of it end to end.
            </p>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
              We work with seed to Series A B2B SaaS founders in the US, UK, and
              UAE. Small team, real work, no account managers.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {["Founder-led", "End-to-end execution"].map((t) => (
              <span
                key={t}
                style={{
                  background: "#e6f4ef",
                  color: "#064e3b",
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: "7px 14px",
                  borderRadius: 999,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
