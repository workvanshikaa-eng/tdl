import { redirect } from "next/navigation";
import { requireRole, accessibleClientIds } from "@/lib/access";
import { prisma } from "@/lib/prisma";

/** /cms/client → jump to the first accessible client dashboard. */
export default async function ClientIndexPage() {
  const user = await requireRole("admin", "intern");
  const ids = await accessibleClientIds(user);
  if (ids.length === 0) {
    return (
      <div className="text-[13px] text-[#71807a]">
        No clients yet. Create one from{" "}
        <span className="font-semibold text-[#064e3b]">Clients &amp; Access</span>.
      </div>
    );
  }
  // Pick the earliest-created accessible client.
  const first = await prisma.client.findFirst({
    where: { id: { in: ids } },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  redirect(`/cms/client/${first!.id}`);
}
