"use client";

import { usePathname } from "next/navigation";
import type { Role } from "@/lib/constants";

function titleFor(
  pathname: string,
  role: Role,
): { title: string; sub: string } {
  if (pathname.startsWith("/cms/account"))
    return { title: "Account", sub: "Your profile and password" };

  if (role === "client") {
    return {
      title: "Your Dashboard",
      sub: "This month's progress on your account.",
    };
  }

  if (pathname.startsWith("/cms/overview"))
    return {
      title: "Admin Overview",
      sub: "Everything across every account this month",
    };
  if (pathname.startsWith("/cms/outreach"))
    return {
      title: "Outreach Tracker",
      sub:
        role === "intern"
          ? "Update, add or remove prospects on your assigned campaigns."
          : "LinkedIn & email campaigns",
    };
  if (pathname.startsWith("/cms/clients"))
    return {
      title: "Clients & Access",
      sub: "Manage client accounts, logins & team access",
    };
  if (pathname.startsWith("/cms/team"))
    return { title: "Team & Access", sub: "Manage intern logins, access & tasks" };
  if (pathname.startsWith("/cms/finance"))
    return { title: "Finance", sub: "Private money tracker & invoices" };
  if (pathname.startsWith("/cms/tasks"))
    return { title: "My Tasks", sub: "Work assigned to you by the admin" };
  if (pathname.startsWith("/cms/client"))
    return {
      title: "Client Dashboard",
      sub: "Deliverables, progress & internal notes",
    };

  return { title: "", sub: "" };
}

const MONTH = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

export default function CmsHeader({ role }: { role: Role }) {
  const pathname = usePathname();
  const { title, sub } = titleFor(pathname, role);
  const roleBadge = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <header className="flex h-[66px] flex-shrink-0 items-center justify-between border-b border-[#e6eae8] bg-white px-[30px]">
      <div>
        <div className="text-[18px] font-semibold tracking-[-0.3px]">
          {title}
        </div>
        <div className="mt-px text-[12.5px] text-[#71807a]">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-[12px] text-[#71807a]">{MONTH}</div>
        <div className="h-[18px] w-px bg-[#e6eae8]" />
        <div className="rounded-[7px] bg-[#ecf3f0] px-3 py-1.5 text-[11.5px] font-semibold text-[#064e3b]">
          {roleBadge}
        </div>
      </div>
    </header>
  );
}
