"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertClientAccess } from "@/lib/access";

/** Staff (admin or intern with access) may manage a client's daily activities. */
async function guardClient(clientId: string) {
  const user = await requireUser();
  if (user.role === "client") throw new Error("Not allowed");
  await assertClientAccess(user, clientId);
  return user;
}

async function guardActivity(activityId: string) {
  const a = await prisma.dailyActivity.findUnique({ where: { id: activityId } });
  if (!a) throw new Error("Activity not found");
  await guardClient(a.clientId);
  return a;
}

export async function addDailyActivity(
  clientId: string,
  name: string,
  dailyTarget: number,
  unit: string,
) {
  await guardClient(clientId);
  const cleanName = name.trim();
  if (!cleanName) return;
  await prisma.dailyActivity.create({
    data: {
      clientId,
      name: cleanName,
      dailyTarget: Math.max(1, Math.floor(dailyTarget || 1)),
      unit: unit.trim() || null,
    },
  });
  revalidatePath("/cms", "layout");
}

export async function editDailyActivity(
  id: string,
  patch: { name?: string; dailyTarget?: number; unit?: string },
) {
  await guardActivity(id);
  const data: { name?: string; dailyTarget?: number; unit?: string | null } = {};
  if (patch.name !== undefined && patch.name.trim()) data.name = patch.name.trim();
  if (patch.dailyTarget !== undefined)
    data.dailyTarget = Math.max(1, Math.floor(patch.dailyTarget || 1));
  if (patch.unit !== undefined) data.unit = patch.unit.trim() || null;
  await prisma.dailyActivity.update({ where: { id }, data });
  revalidatePath("/cms", "layout");
}

export async function deleteDailyActivity(id: string) {
  await guardActivity(id);
  await prisma.dailyActivity.delete({ where: { id } });
  revalidatePath("/cms", "layout");
}

/** Set how many of an activity were done on a given day ('YYYY-MM-DD'). */
export async function setDailyLog(
  activityId: string,
  date: string,
  count: number,
) {
  await guardActivity(activityId);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  const value = Number.isNaN(count) ? 0 : Math.max(0, Math.floor(count));
  await prisma.dailyLog.upsert({
    where: { activityId_date: { activityId, date } },
    create: { activityId, date, count: value },
    update: { count: value },
  });
  revalidatePath("/cms", "layout");
}
