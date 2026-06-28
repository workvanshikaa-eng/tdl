import "server-only";
import { prisma } from "./prisma";
import { istMonthContext, activityPct, headlinePct } from "./daily";
import type { ClientDTO } from "@/components/cms/ClientDashboard";

/** Load one client and map it to the dashboard DTO (deliverables, notes, daily). */
export async function loadClientDTO(clientId: string): Promise<ClientDTO | null> {
  const ctx = istMonthContext();

  const c = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      deliverables: { orderBy: { createdAt: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
      dailyActivities: {
        orderBy: { createdAt: "asc" },
        include: { logs: { where: { date: { startsWith: ctx.prefix } } } },
      },
    },
  });
  if (!c) return null;

  const activities = c.dailyActivities.map((a) => {
    const counts: Record<string, number> = {};
    let monthDone = 0;
    for (const l of a.logs) {
      counts[l.date] = l.count;
      monthDone += l.count;
    }
    return {
      id: a.id,
      name: a.name,
      unit: a.unit,
      dailyTarget: a.dailyTarget,
      counts,
      monthDone,
      pct: activityPct(a.dailyTarget, monthDone, ctx.todayDay),
    };
  });

  const head = headlinePct(c.deliverables, c.dailyActivities, ctx.todayDay);

  return {
    id: c.id,
    name: c.name,
    initials: c.initials,
    service: c.service,
    tenure: c.tenure,
    pct: head.pct,
    headlineLabel: head.label,
    deliverables: c.deliverables.map((d) => ({
      id: d.id,
      name: d.name,
      due: d.due,
      status: d.status,
    })),
    notes: c.notes.map((n) => ({
      id: n.id,
      author: n.authorName,
      initials: n.authorInitials,
      time: n.timeLabel || "—",
      text: n.text,
    })),
    daily: {
      monthLabel: ctx.monthLabel,
      daysElapsed: ctx.todayDay,
      overallPct: activities.length ? head.pct : null,
      days: ctx.days,
      activities,
    },
  };
}
