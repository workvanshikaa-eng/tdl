/**
 * Shared domain constants for the CMS, ported from the design prototype.
 * Statuses are plain strings so they're portable across databases.
 */

export type Role = "admin" | "intern" | "client";

/** Deliverable / Task lifecycle (cycled in this order). */
export const DELIVERABLE_STATES = [
  "Not Started",
  "In Progress",
  "Done",
  "Delayed",
] as const;
export type DeliverableStatus = (typeof DELIVERABLE_STATES)[number];

/** LinkedIn outreach pipeline. */
export const LINKEDIN_STATUSES = [
  "Connection Request Sent",
  "Connection Accepted",
  "Message 1 Sent",
  "Follow-up 1 Sent",
  "Reply Received",
  "Meet Booked",
  "Not Interested",
] as const;

/** Email outreach pipeline. */
export const EMAIL_STATUSES = [
  "Email 1 Sent",
  "Email 2 Sent",
  "Email 3 Sent",
  "Replied",
  "Meeting Booked",
  "Bounced",
  "Not Interested",
] as const;

export type Channel = "linkedin" | "email";

/** Color tokens for a deliverable/task status pill. */
export function deliverableColor(status: string): { bg: string; fg: string } {
  if (status === "Done") return { bg: "#e3f3ea", fg: "#0a7a4f" };
  if (status === "In Progress") return { bg: "#e6f0fb", fg: "#1f6fc4" };
  if (status === "Delayed") return { bg: "#fdeaea", fg: "#c64242" };
  return { bg: "#eef1f0", fg: "#71807a" };
}

/** Color tokens for an outreach status select. */
export function outreachColor(status: string): {
  bg: string;
  fg: string;
  bd: string;
} {
  if (status === "Meet Booked" || status === "Meeting Booked")
    return { bg: "#e3f3ea", fg: "#0a7a4f", bd: "#bfe3cf" };
  if (status === "Reply Received" || status === "Replied")
    return { bg: "#fff4e0", fg: "#b27400", bd: "#f0dcaf" };
  if (status === "Bounced") return { bg: "#fdeaea", fg: "#c64242", bd: "#f2cdcd" };
  if (status === "Not Interested")
    return { bg: "#f6efef", fg: "#a06a6a", bd: "#e3d3d3" };
  if (status === "Connection Accepted")
    return { bg: "#e6f0fb", fg: "#1f6fc4", bd: "#cfe0f4" };
  return { bg: "#f4f6f5", fg: "#4a5752", bd: "#dde3e0" };
}

/** Next status in the deliverable/task cycle. */
export function nextDeliverableStatus(current: string): string {
  const i = DELIVERABLE_STATES.indexOf(current as DeliverableStatus);
  return DELIVERABLE_STATES[(i + 1) % DELIVERABLE_STATES.length];
}

/** Two-letter initials from a name. */
export function initialsOf(name: string): string {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase();
}

type DeliverableProgressLike = {
  status: string;
  targetCount?: number | null;
  doneCount?: number | null;
};

/**
 * How "complete" one deliverable is, as a 0–1 fraction.
 * If it has a quantitative count set (e.g. 8 of 22 posts), that count drives
 * the fraction. Otherwise it falls back to its status (Done = 1, else 0).
 */
export function deliverableFraction(d: DeliverableProgressLike): number {
  if (d.targetCount != null && d.targetCount > 0) {
    return Math.min(1, (d.doneCount ?? 0) / d.targetCount);
  }
  return d.status === "Done" ? 1 : 0;
}

/**
 * Overall completion % across deliverables. Each deliverable contributes its
 * own fraction (quantitative count if set, else Done/not-Done), averaged.
 */
export function completionPct(deliverables: DeliverableProgressLike[]): number {
  if (!deliverables.length) return 0;
  const total = deliverables.reduce((sum, d) => sum + deliverableFraction(d), 0);
  return Math.round((total / deliverables.length) * 100);
}
