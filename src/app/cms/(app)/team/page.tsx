import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import TeamAccess from "@/components/cms/TeamAccess";

export default async function TeamPage() {
  await requireRole("admin");

  const [interns, clients] = await Promise.all([
    prisma.user.findMany({
      where: { role: "intern" },
      orderBy: { createdAt: "asc" },
      include: {
        internAccess: { select: { clientId: true } },
        tasks: {
          orderBy: { createdAt: "asc" },
          include: { client: { select: { name: true } } },
        },
      },
    }),
    prisma.client.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const internDtos = interns.map((n) => ({
    id: n.id,
    name: n.name,
    initials: n.initials,
    email: n.email,
    canEdit: n.canEdit,
    clientIds: n.internAccess.map((a) => a.clientId),
    tasks: n.tasks.map((t) => ({
      id: t.id,
      title: t.title,
      clientName: t.client?.name ?? "Personal task",
      due: t.due,
      status: t.status,
    })),
  }));

  return <TeamAccess interns={internDtos} clients={clients} />;
}
