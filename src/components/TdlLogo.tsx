/**
 * The Distribution Lab logo mark — a rounded square with the lowercase
 * "tdl" wordmark. Crisp at any size (SVG).
 *
 * - default: brand-green square, white text (use on light backgrounds)
 * - inverted: light square, green text (use on dark / green backgrounds)
 */
export default function TdlLogo({
  size = 32,
  inverted = false,
  radius = 0.16,
  className,
}: {
  size?: number;
  inverted?: boolean;
  /** Corner radius as a fraction of the size (0–0.5). */
  radius?: number;
  className?: string;
}) {
  const bg = inverted ? "#dff0e9" : "#064e3b";
  const fg = inverted ? "#064e3b" : "#ffffff";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="The Distribution Lab"
      style={{ flex: "0 0 auto", display: "block" }}
    >
      <rect width="100" height="100" rx={radius * 100} fill={bg} />
      <text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-manrope), ui-sans-serif, system-ui, sans-serif"
        fontSize="52"
        fontWeight={700}
        letterSpacing="-1"
        fill={fg}
      >
        tdl
      </text>
    </svg>
  );
}
