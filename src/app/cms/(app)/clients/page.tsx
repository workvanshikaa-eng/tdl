import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { istMonthContext, headlinePct } from "@/lib/daily";
import ClientsAccess from "@/components/cms/ClientsAccess";

export default async function ClientsPage() {
  await requireRole("admin");
  const ctx = istMonthContext();

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      deliverables: true,
      portalUser: { select: { email: true } },
      dailyActivities: {
        include: { logs: { where: { date: { startsWith: ctx.prefix } } } },
      },
    },
  });

  const dto = clients.map((c) => ({
    id: c.id,
    name: c.name,
    initials: c.initials,
    tenure: c.tenure,
    service: c.service,
    email: c.portalUser?.email ?? "",
    pct: headlinePct(c.deliverables, c.dailyActivities, ctx.todayDay).pct,
  }));

  return <ClientsAccess clients={dto} />;
}
