"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

const items = [
  {
    n: "01",
    title: "Get Pipeline",
    subtext: "LinkedIn lead generation and full outbound management",
    expanded:
      "ICP research and targeting, LinkedIn profile optimisation, outbound sequence writing, full inbox management, weekly reporting on connections, reply rates, and meetings booked.",
  },
  {
    n: "02",
    title: "Get Visible",
    subtext: "LinkedIn personal branding and content ghostwriting",
    expanded:
      "Profile audit and full rewrite, monthly content calendar, ghostwritten posts in your voice, engagement strategy, follower and inbound tracking.",
  },
  {
    n: "03",
    title: "Get Found",
    subtext: "SEO, AEO, Reddit, and Twitter marketing",
    expanded:
      "Keyword research and content gap analysis, long-form SEO articles, AEO optimisation for ChatGPT and Perplexity, Reddit community participation, Twitter content and engagement.",
  },
];

export default function Services() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="services"
      style={{ background: "#ffffff", padding: "100px 24px" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionLabel>What we do</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: "16px 0 0",
            }}
          >
            One system. Three outcomes.
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#6b7280",
              margin: "14px 0 0",
              maxWidth: "58ch",
            }}
          >
            We handle content, outbound, and distribution, everything between your
            product and your first 1,000 users.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[880px]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.n} style={{ borderBottom: "1px solid #e5e7eb" }}>
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
                      fontWeight: 400,
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
                        paddingLeft: "34px",
                        maxWidth: "62ch",
                      }}
                    >
                      {it.expanded}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
