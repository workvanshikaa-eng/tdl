"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/access";
import { assertClientAccess, canEditDeliverables } from "@/lib/access";
import { nextDeliverableStatus } from "@/lib/constants";

async function guard(clientId: string) {
  const user = await requireUser();
  await assertClientAccess(user, clientId);
  if (!canEditDeliverables(user)) {
    throw new Error("Not allowed to edit deliverables");
  }
  return user;
}

export async function cycleDeliverable(id: string) {
  const d = await prisma.deliverable.findUnique({ where: { id } });
  if (!d) return;
  await guard(d.clientId);
  await prisma.deliverable.update({
    where: { id },
    data: { status: nextDeliverableStatus(d.status) },
  });
  revalidatePath("/cms", "layout");
}

export async function editDeliverable(
  id: string,
  field: "name" | "due",
  value: string,
) {
  const d = await prisma.deliverable.findUnique({ where: { id } });
  if (!d) return;
  await guard(d.clientId);
  await prisma.deliverable.update({ where: { id }, data: { [field]: value } });
  revalidatePath("/cms", "layout");
}

/** Update a deliverable's optional quantitative progress (target / done / unit). */
export async function updateDeliverableProgress(
  id: string,
  patch: { unit?: string | null; targetCount?: number | null; doneCount?: number | null },
) {
  const d = await prisma.deliverable.findUnique({ where: { id } });
  if (!d) return;
  await guard(d.clientId);

  const data: {
    unit?: string | null;
    targetCount?: number | null;
    doneCount?: number | null;
  } = {};
  if ("unit" in patch) data.unit = patch.unit?.trim() ? patch.unit.trim() : null;
  if ("targetCount" in patch)
    data.targetCount =
      patch.targetCount == null || Number.isNaN(patch.targetCount)
        ? null
        : Math.max(0, Math.floor(patch.targetCount));
  if ("doneCount" in patch)
    data.doneCount =
      patch.doneCount == null || Number.isNaN(patch.doneCount)
        ? null
        : Math.max(0, Math.floor(patch.doneCount));

  await prisma.deliverable.update({ where: { id }, data });
  revalidatePath("/cms", "layout");
}

export async function deleteDeliverable(id: string) {
  const d = await prisma.deliverable.findUnique({ where: { id } });
  if (!d) return;
  await guard(d.clientId);
  await prisma.deliverable.delete({ where: { id } });
  revalidatePath("/cms", "layout");
}

export async function addDeliverable(clientId: string, name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;
  await guard(clientId);
  await prisma.deliverable.create({
    data: { clientId, name: trimmed, due: "Due —", status: "Not Started" },
  });
  revalidatePath("/cms", "layout");
}
