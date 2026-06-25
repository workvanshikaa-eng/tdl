"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertClientAccess } from "@/lib/access";
import type { Channel } from "@/lib/constants";

const todayLabel = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

export async function addProspect(clientId: string, channel: Channel) {
  const user = await requireUser();
  if (user.role !== "admin" && user.role !== "intern")
    throw new Error("Not allowed");
  await assertClientAccess(user, clientId);
  await prisma.prospect.create({
    data: {
      clientId,
      channel,
      status:
        channel === "email" ? "Email 1 Sent" : "Connection Request Sent",
      dateLabel: todayLabel(),
    },
  });
  revalidatePath("/cms/outreach");
}

export async function setProspectStatus(id: string, status: string) {
  const p = await prisma.prospect.findUnique({ where: { id } });
  if (!p) return;
  const user = await requireUser();
  await assertClientAccess(user, p.clientId);
  await prisma.prospect.update({
    where: { id },
    data: { status, dateLabel: todayLabel() },
  });
  revalidatePath("/cms/outreach");
}

export async function editProspect(
  id: string,
  field: "name" | "url" | "email" | "role" | "company" | "notes",
  value: string,
) {
  const p = await prisma.prospect.findUnique({ where: { id } });
  if (!p) return;
  const user = await requireUser();
  await assertClientAccess(user, p.clientId);
  await prisma.prospect.update({ where: { id }, data: { [field]: value } });
  revalidatePath("/cms/outreach");
}

export async function deleteProspect(id: string) {
  const p = await prisma.prospect.findUnique({ where: { id } });
  if (!p) return;
  const user = await requireUser();
  await assertClientAccess(user, p.clientId);
  await prisma.prospect.delete({ where: { id } });
  revalidatePath("/cms/outreach");
}
