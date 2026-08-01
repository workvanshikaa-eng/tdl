/** Small six-point asterisk / spark mark (Vivid-style), in the accent green. */
export default function Spark({
  size = 12,
  color = "#0a7c5c",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden
      style={{ flex: "0 0 auto" }}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
    </svg>
  );
}
