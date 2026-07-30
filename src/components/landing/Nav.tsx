"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.05)" : "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="text-[16px] font-semibold tracking-[-0.01em] no-underline"
          style={{ color: "#0d0d0d" }}
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-9 min-[761px]:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active || undefined}
                className="nav-link text-[14px] font-medium no-underline"
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
          style={{ background: "#064e3b", letterSpacing: "0.04em" }}
        >
          Start a Project
        </Link>
      </div>
    </nav>
  );
}
