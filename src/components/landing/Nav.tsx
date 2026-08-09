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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(245,245,240,0.85)" : "#f5f5f0",
        backdropFilter: scrolled ? "saturate(180%) blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "#e4e2da" : "transparent"}`,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <span
        className="tdl-progress"
        aria-hidden
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
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
