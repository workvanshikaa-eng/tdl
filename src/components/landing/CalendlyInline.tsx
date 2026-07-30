"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/** Inline Calendly scheduler. Used only on the /contact page. */
export default function CalendlyInline() {
  useEffect(() => {
    const id = "calendly-widget-js";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const url = `${siteConfig.calendlyUrl}?hide_gdpr_banner=1&primary_color=064e3b`;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
