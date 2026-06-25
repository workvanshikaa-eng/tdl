import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { defaultRouteForRole } from "@/lib/routes";
import type { Role } from "@/lib/constants";

export default async function CmsIndex() {
  const user = await getCurrentUser();
  if (!user) redirect("/cms/login");
  redirect(defaultRouteForRole(user.role as Role));
}
