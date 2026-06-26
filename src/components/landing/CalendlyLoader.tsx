"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

/**
 * Loads Calendly's popup widget and intercepts clicks on any link pointing at
 * Calendly, opening the scheduler in an on-page modal instead of navigating
 * away. If the widget hasn't loaded yet, the click falls through to the normal
 * link (opens Calendly in a new tab) — so booking always works.
 */
export default function CalendlyLoader() {
  useEffect(() => {
    // Inject Calendly stylesheet
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Inject Calendly widget script
    const jsId = "calendly-widget-js";
    if (!document.getElementById(jsId)) {
      const script = document.createElement("script");
      script.id = jsId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Match the popup accent to the brand and hide the GDPR banner.
    const withTheme = (url: string) => {
      try {
        const u = new URL(url);
        if (!u.searchParams.has("primary_color"))
          u.searchParams.set("primary_color", "0a6b54");
        u.searchParams.set("hide_gdpr_banner", "1");
        return u.toString();
      } catch {
        return url;
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("calendly.com") && window.Calendly) {
        e.preventDefault();
        window.Calendly.initPopupWidget({ url: withTheme(href) });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
