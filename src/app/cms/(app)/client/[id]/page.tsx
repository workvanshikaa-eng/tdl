import { notFound } from "next/navigation";
import {
  requireRole,
  accessibleClientIds,
  assertClientAccess,
  canEditDeliverables,
} from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { loadClientDTO } from "@/lib/clientData";
import ClientDashboard from "@/components/cms/ClientDashboard";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireRole("admin");
  await assertClientAccess(user, id);

  const client = await loadClientDTO(id);
  if (!client) notFound();

  // Admins get a switcher across all clients; interns across their own.
  const ids = await accessibleClientIds(user);
  const pickerClients = await prisma.client.findMany({
    where: { id: { in: ids } },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true },
  });

  return (
    <ClientDashboard
      client={client}
      canEditDeliverables={canEditDeliverables(user)}
      canAddNote={true}
      picker={pickerClients}
    />
  );
}
