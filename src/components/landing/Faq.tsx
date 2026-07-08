"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

const faqs = [
  {
    q: "Do I really work directly with you?",
    a: "Always. Every audit, strategy call, and decision runs through me. No account managers, no junior team learning on your budget. The Lab is small on purpose.",
  },
  {
    q: "How fast do I see results?",
    a: "You get the audit and a clear distribution plan in week one. Content and outreach ship from week two. Booked calls typically follow within the first month.",
  },
  {
    q: "Do I need to create the content myself?",
    a: "No. I ghostwrite in your voice and run it end to end. A short weekly sync keeps it sounding like you. Everything else is handled.",
  },
  {
    q: "Is this a retainer or project-based?",
    a: "Monthly retainer. Distribution compounds, so it works best as an ongoing engine. We start with a 30-minute call to see if it is a fit before anything else.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
  last,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid #eceeed",
        ...(last ? { borderBottom: "1px solid #eceeed" } : {}),
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-none py-6 text-left font-[inherit]"
        style={{ background: "none", border: "none" }}
      >
        <span style={{ fontSize: "17px", fontWeight: 500, color: "#0d0d0d" }}>
          {q}
        </span>
        <span
          style={{
            flex: "0 0 auto",
            color: "#6b7280",
            fontSize: "20px",
            lineHeight: 1,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform .25s ease",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
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
              maxWidth: "62ch",
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section
      id="faq"
      style={{ background: "#ffffff", padding: "clamp(120px,14vw,160px) 24px" }}
    >
      <div className="mx-auto max-w-[780px]">
        <SectionLabel>FAQ</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(22px,2.6vw,26px)",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: "#0d0d0d",
            margin: "18px 0 32px",
          }}
        >
          Questions founders actually ask.
        </h2>

        {faqs.map((f, i) => (
          <FaqItem
            key={f.q}
            q={f.q}
            a={f.a}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            last={i === faqs.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
