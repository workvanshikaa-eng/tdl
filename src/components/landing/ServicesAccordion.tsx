"use client";

import { useState } from "react";

const items = [
  {
    n: "01",
    title: "LinkedIn",
    subtext: "Your buyers are on LinkedIn every day.",
    body: "If your profile looks abandoned and your posts get 80 impressions, you are invisible to the exact people who should be buying from you. We fix the profile, write the content, run the outbound, and manage the inbox. You show up to calls.",
  },
  {
    n: "02",
    title: "Reddit",
    subtext: "Your ICP is on Reddit right now asking questions your product answers.",
    body: "Nobody is there representing you. We participate in the right communities, answer the right threads, and make sure when someone searches for your solution, your name comes up. Naturally. Not spammily.",
  },
  {
    n: "03",
    title: "Twitter / X",
    subtext: "Twitter still moves fast in B2B SaaS.",
    body: "A single thread from the right founder can do more pipeline in 24 hours than a month of cold email. We build your presence, write in your voice, and make sure you are part of the conversations your buyers are having.",
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
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#374151",
                    margin: "0 0 24px",
                    padding: "0 0 0 34px",
                    maxWidth: "64ch",
                  }}
                >
                  {it.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
