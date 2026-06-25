import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { completionPct } from "@/lib/constants";
import ClientsAccess from "@/components/cms/ClientsAccess";

export default async function ClientsPage() {
  await requireRole("admin");

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "asc" },
    include: { deliverables: true, portalUser: { select: { email: true } } },
  });

  const dto = clients.map((c) => ({
    id: c.id,
    name: c.name,
    initials: c.initials,
    tenure: c.tenure,
    service: c.service,
    email: c.portalUser?.email ?? "",
    pct: completionPct(c.deliverables),
  }));

  return <ClientsAccess clients={dto} />;
}
