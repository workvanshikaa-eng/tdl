"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertClientAccess } from "@/lib/access";

export async function addNote(clientId: string, text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const user = await requireUser();
  await assertClientAccess(user, clientId);

  // Attribute the post to its author. Clients post feedback under their own
  // (company) name so staff can see who wrote it; add a marker for the label.
  await prisma.note.create({
    data: {
      clientId,
      authorUserId: user.id,
      authorName:
        user.role === "client" ? `${user.name} (client)` : user.name,
      authorInitials: user.initials,
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
