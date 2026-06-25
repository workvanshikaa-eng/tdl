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
