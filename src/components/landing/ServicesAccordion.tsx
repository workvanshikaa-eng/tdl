"use client";

import { useState } from "react";

const items = [
  {
    n: "01",
    title: "Get Pipeline",
    subtext: "LinkedIn lead generation and full outbound management",
    details: [
      "ICP research and targeting",
      "LinkedIn profile optimisation",
      "Outbound sequence writing",
      "Full inbox management",
      "Weekly reporting on connections, reply rates, and meetings booked",
      "Ongoing A/B testing of messaging",
    ],
  },
  {
    n: "02",
    title: "Get Visible",
    subtext: "LinkedIn personal branding and content ghostwriting",
    details: [
      "LinkedIn profile audit and full rewrite",
      "Monthly content calendar",
      "Ghostwritten posts in your voice",
      "Engagement strategy",
      "Follower growth and inbound lead tracking",
    ],
  },
  {
    n: "03",
    title: "Get Found",
    subtext: "SEO, AEO, Reddit, and Twitter marketing",
    details: [
      "Keyword research and content gap analysis",
      "Long-form SEO articles written and published",
      "AEO optimisation for ChatGPT, Perplexity, and Google AI",
      "Reddit community participation",
      "Twitter content and engagement strategy",
    ],
  },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="mx-auto max-w-[880px]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.n} data-reveal style={{ borderBottom: "1px solid #e5e7eb" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-5 border-none py-6 text-left transition-colors hover:bg-[#f9fafb]"
              style={{ background: "transparent" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#064e3b" }}>
                {it.n}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block"
                  style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d" }}
                >
                  {it.title}
                </span>
                <span
                  className="mt-1 block"
                  style={{ fontSize: "14px", color: "#6b7280" }}
                >
                  {it.subtext}
                </span>
              </span>
              <span
                aria-hidden
                style={{
                  flex: "0 0 auto",
                  fontSize: "22px",
                  lineHeight: 1,
                  color: "#064e3b",
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows .3s ease",
              }}
            >
              <div style={{ minHeight: 0, overflow: "hidden" }}>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "0 0 24px",
                    padding: "0 0 0 34px",
                    maxWidth: "62ch",
                  }}
                >
                  {it.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "#374151",
                        padding: "5px 0",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          marginTop: 9,
                          flex: "0 0 auto",
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#0a7c5c",
                        }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
