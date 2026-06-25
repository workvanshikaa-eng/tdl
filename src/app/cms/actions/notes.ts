"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertClientAccess } from "@/lib/access";

export async function addNote(clientId: string, text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const user = await requireUser();
  await assertClientAccess(user, clientId);

  // The client portal posts as "You"; staff post under their own name.
  const author =
    user.role === "client"
      ? { name: "You", initials: "YOU", userId: user.id }
      : { name: user.name, initials: user.initials, userId: user.id };

  await prisma.note.create({
    data: {
      clientId,
      authorUserId: author.userId,
      authorName: author.name,
      authorInitials: author.initials,
      text: trimmed,
      timeLabel: "Just now",
    },
  });
  revalidatePath("/cms", "layout");
}

export async function deleteNote(id: string) {
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) return;
  const user = await requireUser();
  await assertClientAccess(user, note.clientId);
  // Clients may not delete notes (read-only feed for them).
  if (user.role === "client") throw new Error("Not allowed");
  await prisma.note.delete({ where: { id } });
  revalidatePath("/cms", "layout");
}
