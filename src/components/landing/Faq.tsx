"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

const faqs = [
  {
    q: "Do I really work directly with you?",
    a: "Always. Every audit, strategy call, and decision runs through me — no account managers, no junior team learning on your budget. The Lab is small on purpose.",
  },
  {
    q: "How fast do I see results?",
    a: "You get the audit and a clear distribution plan in week one. Content and outreach ship from week two. Booked calls typically follow within the first month.",
  },
  {
    q: "Do I need to create the content myself?",
    a: "No. I ghostwrite in your voice and run it end to end. A short weekly sync keeps it sounding like you — everything else is handled.",
  },
  {
    q: "Is this a retainer or project-based?",
    a: "Monthly retainer — distribution compounds, so it works best as an ongoing engine. We start with a 30-minute call to see if it's a fit before anything else.",
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
        borderTop: "1px solid #d3e6dc",
        ...(last ? { borderBottom: "1px solid #d3e6dc" } : {}),
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-none py-[22px] text-left font-[inherit]"
        style={{ background: "none", border: "none" }}
      >
        <span
          className="font-bold text-[#064e3b]"
          style={{ fontSize: "clamp(16px,1.8vw,19px)", letterSpacing: "-0.01em" }}
        >
          {q}
        </span>
        <span
          className="inline-flex h-[30px] w-[30px] flex-[0_0_auto] items-center justify-center rounded-[9px] bg-[#064e3b] text-white transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[grid-template-rows] duration-[320ms]"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transitionTimingFunction: "cubic-bezier(.16,.84,.44,1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="m-0 mb-[22px] max-w-[62ch] text-[15px] leading-[1.6] text-[#566f66]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      id="faq"
      className="bg-transparent"
      style={{ padding: "clamp(58px,7vw,92px) 28px" }}
    >
      <div className="mx-auto max-w-[880px]">
        <SectionLabel>FAQ</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-extrabold"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            fontSize: "clamp(25px,3vw,36px)",
            margin: "20px 0 32px",
            maxWidth: "16ch",
            textWrap: "balance",
          }}
        >
          The questions founders actually ask.
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
