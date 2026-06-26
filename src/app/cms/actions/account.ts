"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/access";
import { hashPassword, verifyPassword } from "@/lib/auth";

/** Change the signed-in user's own password. */
export async function changeMyPassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok?: true; error?: string }> {
  const user = await requireUser();

  if (!newPassword || newPassword.length < 6)
    return { error: "New password must be at least 6 characters" };

  const fresh = await prisma.user.findUnique({ where: { id: user.id } });
  if (!fresh) return { error: "Account not found" };

  const ok = await verifyPassword(currentPassword, fresh.passwordHash);
  if (!ok) return { error: "Your current password is incorrect" };

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });
  return { ok: true };
}
