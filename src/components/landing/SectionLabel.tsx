/** The small uppercase eyebrow with a leading dash, used above section headings. */
export default function SectionLabel({
  children,
  reveal = true,
  light = false,
}: {
  children: React.ReactNode;
  reveal?: boolean;
  light?: boolean;
}) {
  const color = light ? "#6ee7b7" : "#0a6b54";
  return (
    <div
      {...(reveal ? { "data-reveal": "" } : {})}
      className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em]"
      style={{ color }}
    >
      <span style={{ width: 28, height: 1.5, background: color }} />
      {children}
    </div>
  );
}
