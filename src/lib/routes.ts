import type { Role } from "./constants";

/** Where each role lands after login / when hitting /cms. */
export function defaultRouteForRole(role: Role): string {
  if (role === "admin") return "/cms/overview";
  if (role === "intern") return "/cms/tasks";
  return "/cms/dashboard";
}
