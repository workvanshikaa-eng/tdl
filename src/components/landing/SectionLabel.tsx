/** A small, restrained section label (small caps). */
export default function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className="font-semibold uppercase"
      style={{
        fontSize: "11px",
        letterSpacing: "0.1em",
        color: light ? "rgba(255,255,255,0.6)" : "#6b7280",
      }}
    >
      {children}
    </div>
  );
}
