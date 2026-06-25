"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, requireRole } from "@/lib/access";
import { nextDeliverableStatus } from "@/lib/constants";

/** Advance a task's status. Admin (any) or the owning intern. */
export async function cycleTask(id: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return;
  const user = await requireUser();
  if (user.role !== "admin" && task.internId !== user.id)
    throw new Error("Not allowed");
  await prisma.task.update({
    where: { id },
    data: { status: nextDeliverableStatus(task.status) },
  });
  revalidatePath("/cms", "layout");
}

/** Assign a task to an intern. Admin only. clientId null = personal task. */
export async function addTask(
  internId: string,
  title: string,
  clientId: string | null,
) {
  await requireRole("admin");
  const trimmed = title.trim();
  if (!trimmed) return;
  await prisma.task.create({
    data: { internId, title: trimmed, clientId, due: "Jun 28", status: "Not Started" },
  });
  revalidatePath("/cms", "layout");
}

export async function deleteTask(id: string) {
  await requireRole("admin");
  await prisma.task.delete({ where: { id } }).catch(() => {});
  revalidatePath("/cms", "layout");
}
