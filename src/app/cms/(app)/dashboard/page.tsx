import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { loadClientDTO } from "@/lib/clientData";
import ClientDashboard from "@/components/cms/ClientDashboard";

/** The signed-in client's own read-only dashboard. */
export default async function ClientPortalPage() {
  const user = await requireRole("client");

  const own = await prisma.client.findFirst({
    where: { portalUserId: user.id },
    select: { id: true },
  });

  if (!own) {
    return (
      <div className="text-[13px] text-[#71807a]">
        Your account isn&apos;t linked to a client workspace yet. Please contact
        your account manager.
      </div>
    );
  }

  const client = await loadClientDTO(own.id);
  if (!client) return null;

  return (
    <ClientDashboard
      client={client}
      canEditDeliverables={false}
      canAddNote={false}
    />
  );
}
