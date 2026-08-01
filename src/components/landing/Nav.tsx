"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import Spark from "./Spark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
];

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: "12px",
};

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
        background: scrolled ? "rgba(255,255,255,0.85)" : "#ffffff",
        backdropFilter: scrolled ? "saturate(180%) blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "#eceeec" : "transparent"}`,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="no-underline"
          style={{
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#0d0d0d",
          }}
        >
          {siteConfig.name}
          <sup style={{ fontSize: "9px", color: "#0a7c5c", marginLeft: 2 }}>®</sup>
        </Link>

        <div className="hidden items-center gap-9 min-[761px]:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active || undefined}
                className="nav-link no-underline"
                style={{
                  ...monoLabel,
                  color: active ? "#064e3b" : "#4b5563",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-white no-underline transition-colors hover:bg-[#0a7c5c]"
          style={{ ...monoLabel, background: "#064e3b" }}
        >
          <Spark size={11} color="#ffffff" />
          Start a Project
        </Link>
      </div>
    </nav>
  );
}
