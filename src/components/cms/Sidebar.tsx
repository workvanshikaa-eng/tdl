"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/constants";
import { logout } from "@/app/cms/actions";

type NavItem = { href: string; label: string; icon: string };

const NAV: Record<Role, NavItem[]> = {
  admin: [
    { href: "/cms/overview", label: "Admin Overview", icon: "◧" },
    { href: "/cms/outreach", label: "Outreach Tracker", icon: "◎" },
    { href: "/cms/client", label: "Client Dashboards", icon: "▣" },
    { href: "/cms/clients", label: "Clients & Access", icon: "▤" },
    { href: "/cms/team", label: "Team & Access", icon: "◐" },
  ],
  intern: [
    { href: "/cms/tasks", label: "My Tasks", icon: "✓" },
    { href: "/cms/outreach", label: "Outreach Tracker", icon: "◎" },
  ],
  client: [{ href: "/cms/dashboard", label: "My Dashboard", icon: "▣" }],
};

export default function Sidebar({
  role,
  userName,
  userSubtitle,
  userInitials,
}: {
  role: Role;
  userName: string;
  userSubtitle: string;
  userInitials: string;
}) {
  const pathname = usePathname();
  const items = NAV[role];

  return (
    <aside className="flex w-[248px] flex-shrink-0 flex-col bg-[#064e3b] px-4 py-[22px] text-[#dff0e9]">
      <div className="flex items-center gap-[11px] px-2 pb-[22px]">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#dff0e9] text-[15px] font-bold tracking-[-0.5px] text-[#064e3b]">
          TD
        </div>
        <div>
          <div className="text-[14.5px] font-semibold leading-[1.1] text-white">
            The Distribution Lab
          </div>
          <div className="mt-0.5 text-[11px] text-[#7fb6a0]">Client OS</div>
        </div>
      </div>

      <div className="px-2 py-1.5 text-[10.5px] font-semibold tracking-[0.7px] text-[#5e9b84]">
        NAVIGATION
      </div>
      <nav className="mt-1 flex flex-col gap-[3px]">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-[11px] rounded-[9px] px-2.5 py-[9px] text-[13.5px] font-medium no-underline transition-colors"
              style={
                active
                  ? { background: "rgba(255,255,255,0.13)", color: "#fff" }
                  : { color: "#bfe0d3" }
              }
            >
              <span className="w-4 text-center text-[14px] opacity-95">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-3.5">
        <div className="flex items-center gap-2.5 px-2 pb-3">
          <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-[#dff0e9] text-[13px] font-semibold text-[#064e3b]">
            {userInitials}
          </div>
          <div className="min-w-0 leading-[1.2]">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-white">
              {userName}
            </div>
            <div className="text-[11px] text-[#7fb6a0]">{userSubtitle}</div>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-[7px] rounded-[9px] border border-white/[0.14] bg-transparent py-[9px] text-[12.5px] font-semibold text-[#bfe0d3] transition-colors hover:bg-white/[0.08]"
          >
            <span className="text-[13px]">⏻</span> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
