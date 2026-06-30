"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/access";
import { hashPassword } from "@/lib/auth";
import { initialsOf } from "@/lib/constants";
import { randomPassword } from "@/lib/password";

/** Create a client + its portal login. Admin only. */
export async function addClient(
  name: string,
  service: string,
  email: string,
  password?: string,
): Promise<{ error?: string }> {
  await requireRole("admin");
  const cleanName = name.trim();
  if (!cleanName) return { error: "Client name is required" };

  const cleanService = service.trim() || "Retainer";
  const cleanEmail =
    email.trim().toLowerCase() ||
    `${cleanName.toLowerCase().split(/\s+/)[0]}@portal.tdl.com`;

  const cleanPassword = (password ?? "").trim();
  if (cleanPassword && cleanPassword.length < 6)
    return { error: "Password must be at least 6 characters" };

  const existing = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });
  if (existing) return { error: "That login email is already in use" };

  const passwordHash = await hashPassword(cleanPassword || randomPassword());
  const initials = initialsOf(cleanName);

  const portalUser = await prisma.user.create({
    data: {
      email: cleanEmail,
      passwordHash,
      name: cleanName,
      initials,
      role: "client",
      subtitle: "Client account",
    },
  });

  await prisma.client.create({
    data: {
      name: cleanName,
      initials,
      service: cleanService,
      tenure: "New client · " +
        new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      portalUserId: portalUser.id,
    },
  });

  revalidatePath("/cms", "layout");
  return {};
}

export async function editClient(
  id: string,
  field: "service" | "email" | "name",
  value: string,
) {
  await requireRole("admin");
  if (field === "name") {
    const name = value.trim();
    if (!name) return;
    await prisma.client.update({
      where: { id },
      data: { name, initials: initialsOf(name) },
    });
  } else if (field === "service") {
    await prisma.client.update({ where: { id }, data: { service: value } });
  } else {
    // email lives on the linked portal user
    const client = await prisma.client.findUnique({ where: { id } });
    if (client?.portalUserId) {
      await prisma.user.update({
        where: { id: client.portalUserId },
        data: { email: value.trim().toLowerCase() },
      });
    }
  }
  revalidatePath("/cms", "layout");
}

/** Reset a client's portal password to a new generated one. Returns it once. */
export async function resetClientPassword(
  clientId: string,
): Promise<{ password?: string; error?: string }> {
  await requireRole("admin");
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client?.portalUserId) return { error: "No login for this client" };
  const password = randomPassword();
  await prisma.user.update({
    where: { id: client.portalUserId },
    data: { passwordHash: await hashPassword(password) },
  });
  return { password };
}

export async function deleteClient(id: string) {
  await requireRole("admin");
  const client = await prisma.client.findUnique({ where: { id } });
  // Remove the linked portal user too (client relations cascade on delete).
  await prisma.client.delete({ where: { id } });
  if (client?.portalUserId) {
    await prisma.user
      .delete({ where: { id: client.portalUserId } })
      .catch(() => {});
  }
  revalidatePath("/cms", "layout");
}
