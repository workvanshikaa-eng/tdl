/** Helpers for daily-activity tracking. Month boundaries use IST (Asia/Kolkata). */

const TZ = "Asia/Kolkata";

export type MonthContext = {
  year: number;
  month: number; // 1-12
  monthLabel: string;
  daysInMonth: number;
  todayDay: number; // 1-31 (days elapsed this month, inclusive of today)
  prefix: string; // 'YYYY-MM' for log filtering
  days: { day: number; dateStr: string; isToday: boolean; isFuture: boolean }[];
};

export function istMonthContext(): MonthContext {
  const todayStr = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(
    new Date(),
  ); // 'YYYY-MM-DD'
  const [y, m, d] = todayStr.split("-").map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const monthLabel = new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const mm = String(m).padStart(2, "0");
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return {
      day,
      dateStr: `${y}-${mm}-${String(day).padStart(2, "0")}`,
      isToday: day === d,
      isFuture: day > d,
    };
  });
  return {
    year: y,
    month: m,
    monthLabel,
    daysInMonth,
    todayDay: d,
    prefix: `${y}-${mm}`,
    days,
  };
}

export function activityPct(
  dailyTarget: number,
  monthDone: number,
  daysElapsed: number,
): number {
  const expected = dailyTarget * daysElapsed;
  if (expected <= 0) return 0;
  return Math.min(100, Math.round((monthDone / expected) * 100));
}

type DeliverableLike = { status: string };
type ActivityLike = {
  dailyTarget: number;
  logs: { date: string; count: number }[];
};

/**
 * The headline % for a client this month:
 * - if it has daily activities → daily completion to date
 * - else → % of deliverables done
 */
export function headlinePct(
  deliverables: DeliverableLike[],
  activities: ActivityLike[],
  daysElapsed: number,
): { pct: number; label: string; mode: "daily" | "deliverables" | "none" } {
  if (activities.length) {
    let done = 0;
    let expected = 0;
    for (const a of activities) {
      done += a.logs.reduce((s, l) => s + l.count, 0);
      expected += a.dailyTarget * daysElapsed;
    }
    const pct = expected > 0 ? Math.min(100, Math.round((done / expected) * 100)) : 0;
    return { pct, label: "daily targets met this month", mode: "daily" };
  }
  if (deliverables.length) {
    const done = deliverables.filter((d) => d.status === "Done").length;
    return {
      pct: Math.round((done / deliverables.length) * 100),
      label: "deliverables done",
      mode: "deliverables",
    };
  }
  return { pct: 0, label: "deliverables done", mode: "none" };
}
