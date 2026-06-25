"use client";

import { useEffect } from "react";

/**
 * Wires up the landing page's scroll-driven behaviour:
 *  - sticky nav background on scroll
 *  - data-reveal scroll reveals (with per-element delay)
 *  - data-countup number count-ups
 *  - data-chart-line SVG draw-on-scroll
 * All effects respect prefers-reduced-motion.
 */
export default function LandingScripts() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // ---- Nav scroll state ----
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const onScroll = () => {
      if (!nav) return;
      const s = window.scrollY > 40;
      nav.style.background = s ? "rgba(250,248,244,0.85)" : "transparent";
      nav.style.backdropFilter = s ? "saturate(180%) blur(12px)" : "none";
      (nav.style as CSSStyleDeclaration & {
        webkitBackdropFilter: string;
      }).webkitBackdropFilter = nav.style.backdropFilter;
      nav.style.borderBottomColor = s ? "rgba(6,78,59,0.08)" : "transparent";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ---- Scroll reveals ----
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (reduce) {
      reveals.forEach((el) => el.classList.add("is-revealed"));
    } else if ("IntersectionObserver" in window) {
      const ro = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const d = parseFloat(el.getAttribute("data-reveal-delay") || "0");
              el.style.transitionDelay = d + "ms";
              el.classList.add("is-revealed");
              ro.unobserve(el);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((el) => ro.observe(el));
      cleanups.push(() => ro.disconnect());
    } else {
      reveals.forEach((el) => el.classList.add("is-revealed"));
    }

    // ---- Count-ups ----
    const counts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-countup]"),
    );
    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-countup") || "0");
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const comma = el.getAttribute("data-format") === "comma";
      const dur = 1700;
      const start = Date.now();
      const render = (val: number) => {
        el.textContent =
          prefix +
          (comma ? val.toLocaleString("en-US") : String(val)) +
          suffix;
      };
      if (reduce) {
        render(target);
        return;
      }
      const id = window.setInterval(() => {
        const p = Math.min(1, (Date.now() - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        render(Math.round(target * eased));
        if (p >= 1) window.clearInterval(id);
      }, 32);
      cleanups.push(() => window.clearInterval(id));
      render(0);
    };
    if ("IntersectionObserver" in window) {
      const co = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              runCount(e.target as HTMLElement);
              co.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counts.forEach((el) => co.observe(el));
      cleanups.push(() => co.disconnect());
    } else {
      counts.forEach(runCount);
    }

    // ---- Chart draw ----
    const lines = Array.from(
      document.querySelectorAll<SVGPathElement>("[data-chart-line]"),
    );
    lines.forEach((line) => {
      if (!line.getTotalLength) return;
      const svg = line.closest("svg");
      const area = svg?.querySelector<SVGPathElement>("[data-chart-area]");
      const dot = svg?.querySelector<SVGCircleElement>("[data-chart-dot]");
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      line.style.transition = "stroke-dashoffset 2.2s cubic-bezier(.22,.61,.36,1)";
      const draw = () => {
        line.style.strokeDashoffset = "0";
        if (area) {
          area.style.transition = "opacity 1.6s ease .35s";
          area.style.opacity = "1";
        }
        if (dot) {
          dot.style.transition = "opacity .5s ease 1.9s";
          dot.style.opacity = "1";
        }
      };
      if (reduce) {
        line.style.strokeDashoffset = "0";
        if (area) area.style.opacity = "1";
        if (dot) dot.style.opacity = "1";
        return;
      }
      if ("IntersectionObserver" in window) {
        const cho = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                draw();
                cho.unobserve(e.target);
              }
            });
          },
          { threshold: 0.3 },
        );
        cho.observe(line);
        cleanups.push(() => cho.disconnect());
      } else {
        draw();
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
