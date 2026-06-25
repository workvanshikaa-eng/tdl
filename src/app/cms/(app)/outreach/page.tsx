import { requireRole, accessibleClientIds } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import OutreachTracker from "@/components/cms/OutreachTracker";

export default async function OutreachPage() {
  const user = await requireRole("admin", "intern");
  const ids = await accessibleClientIds(user);

  const clients = await prisma.client.findMany({
    where: { id: { in: ids } },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true },
  });
  const nameById = new Map(clients.map((c) => [c.id, c.name]));

  const rows = await prisma.prospect.findMany({
    where: { clientId: { in: ids } },
    orderBy: { createdAt: "desc" },
  });

  const prospects = rows.map((p) => ({
    id: p.id,
    clientId: p.clientId,
    clientName: nameById.get(p.clientId) ?? "",
    channel: p.channel,
    name: p.name,
    url: p.url,
    email: p.email,
    role: p.role,
    company: p.company,
    status: p.status,
    notes: p.notes,
    dateLabel: p.dateLabel,
  }));

  return <OutreachTracker prospects={prospects} clients={clients} />;
}
