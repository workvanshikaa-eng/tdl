import Spark from "./Spark";

/** Uppercase monospace section label: optional counter + green spark + text,
 *  with an underline that draws in when the section scrolls into view. */
export default function SectionLabel({
  children,
  num,
  spark = true,
}: {
  children: React.ReactNode;
  num?: string;
  spark?: boolean;
}) {
  return (
    <div className="inline-block">
      <div
        className="inline-flex items-center gap-2 uppercase"
        style={{
          fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
          fontSize: "11px",
          letterSpacing: "0.22em",
          color: "#0a7c5c",
        }}
      >
        {num && <span style={{ fontWeight: 700, color: "#064e3b" }}>{num}</span>}
        {spark && <Spark size={11} />}
        {children}
      </div>
      <span className="tdl-seclabel-underline" aria-hidden />
    </div>
  );
}
