import "server-only";
import { redirect } from "next/navigation";
import { getCurrentUser, type CurrentUser } from "./auth";
import { prisma } from "./prisma";
import type { Role } from "./constants";

/** Require any signed-in user (else → login). */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/cms/login");
  return user;
}

/** Require one of the given roles (else → their own default area). */
export async function requireRole(...roles: Role[]): Promise<CurrentUser> {
  const user = await requireUser();
  if (!roles.includes(user.role as Role)) {
    redirect("/cms");
  }
  return user;
}

/**
 * The set of client ids a user is allowed to see/act on.
 * - admin  → every client
 * - intern → clients granted via InternClientAccess
 * - client → only their own linked client
 */
export async function accessibleClientIds(user: CurrentUser): Promise<string[]> {
  if (user.role === "admin") {
    const all = await prisma.client.findMany({ select: { id: true } });
    return all.map((c) => c.id);
  }
  if (user.role === "intern") {
    const rows = await prisma.internClientAccess.findMany({
      where: { internId: user.id },
      select: { clientId: true },
    });
    return rows.map((r) => r.clientId);
  }
  // client
  const own = await prisma.client.findFirst({
    where: { portalUserId: user.id },
    select: { id: true },
  });
  return own ? [own.id] : [];
}

/** Throws (redirects) if the user may not access this client. */
export async function assertClientAccess(
  user: CurrentUser,
  clientId: string,
): Promise<void> {
  const ids = await accessibleClientIds(user);
  if (!ids.includes(clientId)) redirect("/cms");
}

/** Can this user edit deliverables for clients? admin always; intern if canEdit. */
export function canEditDeliverables(user: CurrentUser): boolean {
  if (user.role === "admin") return true;
  if (user.role === "intern") return user.canEdit;
  return false;
}
