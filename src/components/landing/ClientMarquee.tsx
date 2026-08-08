import Spark from "./Spark";

const clients = [
  "TalentGPT",
  "PrepNest",
  "Sked Club",
  "Mockzy",
  "Distrute",
  "Turtlepic",
  "VibeLRN",
  "Grit School",
];

/** Infinite horizontal marquee of client names (pauses on hover). */
export default function ClientMarquee() {
  // Two identical groups so the -50% translate loops seamlessly.
  const groups = [0, 1];

  return (
    <section
      style={{
        background: "#ffffff",
        borderTop: "1px solid #eceeec",
        borderBottom: "1px solid #eceeec",
        padding: "40px 0",
      }}
    >
      <div
        className="mx-auto max-w-[1200px] px-6"
        style={{
          fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontSize: "11px",
          color: "#6b7280",
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        Founders who stopped being invisible
      </div>

      {/* Edge fade mask */}
      <div
        className="tdl-mq"
        style={{
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          className="tdl-mq-track"
          style={{
            display: "flex",
            width: "max-content",
            animation: "tdl-marquee 34s linear infinite",
          }}
          aria-hidden
        >
          {groups.map((g) => (
            <div key={g} style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
              {clients.map((name) => (
                <div
                  key={g + name}
                  style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}
                >
                  <span
                    style={{
                      fontSize: "clamp(20px,2.6vw,30px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "#0d0d0d",
                      padding: "0 34px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </span>
                  <Spark size={12} color="#cfe6dc" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Screen-reader friendly, non-duplicated list */}
      <span className="sr-only">
        Clients: {clients.join(", ")}
      </span>
    </section>
  );
}
