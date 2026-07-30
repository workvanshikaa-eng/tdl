/** Small-caps section label (accent green). */
export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="font-semibold uppercase"
      style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#0a7c5c" }}
    >
      {children}
    </div>
  );
}
