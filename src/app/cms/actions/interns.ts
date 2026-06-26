"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/access";
import { hashPassword } from "@/lib/auth";
import { initialsOf } from "@/lib/constants";
import { randomPassword } from "@/lib/password";

/** Create a new intern login. Admin only. */
export async function addIntern(
  name: string,
  email: string,
  password?: string,
): Promise<{ error?: string }> {
  await requireRole("admin");
  const cleanName = name.trim();
  if (!cleanName) return { error: "Name is required" };

  const cleanEmail =
    email.trim().toLowerCase() ||
    `${cleanName.toLowerCase().split(/\s+/)[0]}@thedistributionlab.com`;

  const cleanPassword = (password ?? "").trim();
  if (cleanPassword && cleanPassword.length < 6)
    return { error: "Password must be at least 6 characters" };

  const existing = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });
  if (existing) return { error: "That login email is already in use" };

  const passwordHash = await hashPassword(cleanPassword || randomPassword());
  await prisma.user.create({
    data: {
      email: cleanEmail,
      passwordHash,
      name: cleanName,
      initials: initialsOf(cleanName),
      role: "intern",
      subtitle: "Intern",
      canEdit: false,
    },
  });
  revalidatePath("/cms", "layout");
  return {};
}

/** Reset an intern's password to a new generated one. Returns it once. */
export async function resetInternPassword(
  internId: string,
): Promise<{ password?: string; error?: string }> {
  await requireRole("admin");
  const intern = await prisma.user.findUnique({ where: { id: internId } });
  if (!intern || intern.role !== "intern") return { error: "Intern not found" };
  const password = randomPassword();
  await prisma.user.update({
    where: { id: internId },
    data: { passwordHash: await hashPassword(password) },
  });
  return { password };
}

export async function toggleInternEdit(internId: string) {
  await requireRole("admin");
  const intern = await prisma.user.findUnique({ where: { id: internId } });
  if (!intern || intern.role !== "intern") return;
  await prisma.user.update({
    where: { id: internId },
    data: { canEdit: !intern.canEdit },
  });
  revalidatePath("/cms", "layout");
}

export async function deleteIntern(internId: string) {
  await requireRole("admin");
  await prisma.user
    .delete({ where: { id: internId } })
    .catch(() => {});
  revalidatePath("/cms", "layout");
}

/** Grant or revoke an intern's access to a client. */
export async function toggleInternClientAccess(
  internId: string,
  clientId: string,
) {
  await requireRole("admin");
  const existing = await prisma.internClientAccess.findUnique({
    where: { internId_clientId: { internId, clientId } },
  });
  if (existing) {
    await prisma.internClientAccess.delete({ where: { id: existing.id } });
  } else {
    await prisma.internClientAccess.create({ data: { internId, clientId } });
  }
  revalidatePath("/cms", "layout");
}
