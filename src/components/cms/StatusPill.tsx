"use client";

import { deliverableColor } from "@/lib/constants";

/**
 * A deliverable/task status pill. When `onClick` is given it renders as a
 * clickable button that advances the status.
 */
export default function StatusPill({
  status,
  onClick,
  pending = false,
}: {
  status: string;
  onClick?: () => void;
  pending?: boolean;
}) {
  const c = deliverableColor(status);
  const style: React.CSSProperties = {
    fontSize: "11.5px",
    fontWeight: 600,
    padding: "5px 11px",
    borderRadius: 20,
    background: c.bg,
    color: c.fg,
    whiteSpace: "nowrap",
    textAlign: "center",
    minWidth: 88,
    border: "none",
    opacity: pending ? 0.5 : 1,
    cursor: onClick ? "pointer" : "default",
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} disabled={pending} style={style}>
        {status}
      </button>
    );
  }
  return <span style={style}>{status}</span>;
}
