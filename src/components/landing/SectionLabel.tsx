import Spark from "./Spark";

/** Uppercase monospace section label with a small green spark (Vivid-style). */
export default function SectionLabel({
  children,
  spark = true,
}: {
  children: React.ReactNode;
  spark?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 uppercase"
      style={{
        fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
        fontSize: "11px",
        letterSpacing: "0.22em",
        color: "#0a7c5c",
      }}
    >
      {spark && <Spark size={11} />}
      {children}
    </div>
  );
}
