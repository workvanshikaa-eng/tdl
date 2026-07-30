"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fades `[data-reveal]` elements up into view once, on scroll. Re-runs on
 *  every route change so animations fire on each page. Subtle only. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)"),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const d = parseFloat(el.getAttribute("data-reveal-delay") || "0");
            el.style.transitionDelay = d + "ms";
            el.classList.add("revealed");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
