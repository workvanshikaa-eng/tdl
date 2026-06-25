import "server-only";
import { prisma } from "./prisma";
import { completionPct } from "./constants";
import type { ClientDTO } from "@/components/cms/ClientDashboard";

/** Load one client and map it to the dashboard DTO (deliverables + notes). */
export async function loadClientDTO(clientId: string): Promise<ClientDTO | null> {
  const c = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      deliverables: { orderBy: { createdAt: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!c) return null;

  return {
    id: c.id,
    name: c.name,
    initials: c.initials,
    service: c.service,
    tenure: c.tenure,
    pct: completionPct(c.deliverables),
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
  };
}
