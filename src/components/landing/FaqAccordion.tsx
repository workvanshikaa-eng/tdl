"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What exactly do you do on LinkedIn, Reddit, and Twitter?",
    a: "On LinkedIn we write your content, run outbound to your ICP, and manage the inbox. On Reddit we participate in the communities where your buyers ask questions and make sure your product comes up naturally. On Twitter we build your presence and write in your voice. Everything is done for you. You just show up to the meetings we book.",
  },
  {
    q: "Do I need to be involved day to day?",
    a: "No. That is the point. We need 30 to 60 minutes from you once a week, a call or voice notes. We handle everything else. The content sounds like you because we learn how you think. You stay focused on the product.",
  },
  {
    q: "How much does it cost?",
    a: "First month is Rs. 30,000. We prove the system works before we talk about what comes next. No lock-in, no 6-month contracts upfront. If it works, we scale. If it does not, we have an honest conversation.",
  },
  {
    q: "How long before I see results?",
    a: "LinkedIn outbound starts generating conversations in week 2 to 3. Content takes 60 to 90 days to compound. Reddit and Twitter are slower burns that pay off in month 3 and beyond. We will be straight with you about what to expect at each stage.",
  },
  {
    q: "Do you work with any kind of startup or only B2B SaaS?",
    a: "Primarily seed to Series A B2B SaaS founders. If you are B2C, have no product yet, or need a quick campaign with no strategy behind it, we are probably not the right fit.",
  },
  {
    q: "Why only three channels? What about ads, SEO, email?",
    a: "Because most founders spread thin across eight channels and win on none. LinkedIn, Reddit, and Twitter are where B2B SaaS buyers live, research, and make decisions. We go deep on three channels and build something that compounds instead of burning budget on five things that go nowhere.",
  },
  {
    q: "Can you guarantee results?",
    a: "No. Anyone who does is lying. What we can tell you is that we have done this before, we know what works, and we will show you the numbers every week. You will always know exactly what is happening and why.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div className="mx-auto max-w-[820px]">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} data-reveal style={{ borderBottom: "1px solid #e5e7eb" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-5 border-none py-6 text-left transition-colors hover:bg-[#f9fafb]"
              style={{ background: "transparent" }}
            >
              <span
                className="min-w-0 flex-1"
                style={{ fontSize: "18px", fontWeight: 600, color: "#0d0d0d" }}
              >
                {f.q}
              </span>
              <span
                aria-hidden
                style={{ flex: "0 0 auto", fontSize: "22px", lineHeight: 1, color: "#064e3b" }}
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
                    margin: "0 0 26px",
                    maxWidth: "66ch",
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
