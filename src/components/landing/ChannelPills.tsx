"use client";

import { useState } from "react";

const channels = [
  {
    name: "LinkedIn",
    desc: "Your buyers are on LinkedIn every day. If your profile looks abandoned and your posts get 80 impressions, you are invisible to the exact people who should be buying from you. We fix the profile, write the content, run the outbound, and manage the inbox. You show up to calls.",
  },
  {
    name: "Reddit",
    desc: "Your ICP is on Reddit right now asking questions your product answers. Nobody is there representing you. We participate in the right communities, answer the right threads, and make sure when someone searches for your solution, your name comes up. Naturally. Not spammily.",
  },
  {
    name: "Twitter / X",
    desc: "Twitter still moves fast in B2B SaaS. A single thread from the right founder can do more pipeline in 24 hours than a month of cold email. We build your presence, write in your voice, and make sure you are part of the conversations your buyers are having.",
  },
];

const pill: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "13px",
  padding: "12px 26px",
  borderRadius: 9999,
  cursor: "pointer",
  transition: "background-color .2s ease, color .2s ease, border-color .2s ease",
};

export default function ChannelPills() {
  const [sel, setSel] = useState<number>(0);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {channels.map((c, i) => {
          const active = sel === i;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setSel(active ? -1 : i)}
              aria-expanded={active}
              style={{
                ...pill,
                background: active ? "#064e3b" : "#ffffff",
                color: active ? "#ffffff" : "#064e3b",
                border: `1px solid ${active ? "#064e3b" : "#d3e6dc"}`,
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateRows: sel >= 0 ? "1fr" : "0fr",
          transition: "grid-template-rows .3s ease",
          marginTop: sel >= 0 ? 20 : 0,
        }}
      >
        <div style={{ minHeight: 0, overflow: "hidden" }}>
          <div
            style={{
              background: "#f4faf7",
              border: "1px solid #e3f0ea",
              borderRadius: 12,
              padding: "28px 30px",
            }}
          >
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: "68ch" }}>
              {sel >= 0 ? channels[sel].desc : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
