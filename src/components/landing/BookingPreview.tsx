"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

/** Decorative interactive calendar preview that links out to the real booking page. */
const selectableDays = [16, 17, 18, 19, 23, 24, 25];
const slots = ["10:00", "11:30", "14:00"];

export default function BookingPreview() {
  const [day, setDay] = useState(18);
  const [slot, setSlot] = useState("11:30");

  const dayStyle = (d: number, selectable: boolean): React.CSSProperties => {
    if (!selectable) {
      // muted / out-of-range days
      return {
        padding: "7px 0",
        color: [20, 26, 27].includes(d) ? "#0f2e25" : "#dde7e2",
      };
    }
    const active = d === day;
    return {
      padding: "7px 0",
      borderRadius: 8,
      cursor: "pointer",
      color: active ? "#fff" : "#0a6b54",
      background: active ? "#064e3b" : "#E8F2EE",
    };
  };

  return (
    <a
      data-reveal
      data-reveal-delay="120"
      href={siteConfig.calendlyUrl}
      target="_blank"
      rel="noopener"
      className="relative block rounded-[22px] bg-white no-underline transition-transform duration-[250ms] hover:-translate-y-[3px]"
      style={{
        color: "inherit",
        padding: "clamp(20px,2.4vw,26px)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.34)",
      }}
    >
      <div className="flex items-center gap-3 border-b border-[#eef3f0] pb-[18px]">
        <span className="inline-flex h-[42px] w-[42px] flex-[0_0_auto] items-center justify-center rounded-full bg-[#064e3b] text-[16px] font-extrabold text-[#6ee7b7]">
          V
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-[-0.01em] text-[#0f2e25]">
            Intro call · Vanshika
          </div>
          <div className="mt-[3px] flex items-center gap-3 text-[12px] font-semibold text-[#7c8c85]">
            <span className="inline-flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              30 min
            </span>
            <span className="inline-flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m23 7-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              Google Meet
            </span>
          </div>
        </div>
      </div>

      <div className="mt-[18px] flex items-center justify-between">
        <span className="text-[14px] font-extrabold text-[#0f2e25]">
          June 2026
        </span>
        <div className="flex gap-1.5">
          <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[7px] border border-[#e0eae6] text-[#9bb3a8]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </span>
          <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[7px] border border-[#e0eae6] text-[#0a6b54]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-0.5 text-center font-mono text-[10px] text-[#a9bcb3]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[12.5px] font-semibold">
        {/* week of 9–15 (muted, out of range) */}
        {[9, 10, 11, 12, 13].map((d) => (
          <span key={d} style={{ padding: "7px 0", color: "#c3d2cb" }}>
            {d}
          </span>
        ))}
        {[14, 15].map((d) => (
          <span key={d} style={{ padding: "7px 0", color: "#dde7e2" }}>
            {d}
          </span>
        ))}
        {/* week of 16–22 */}
        {[16, 17, 18, 19, 20, 21, 22].map((d) => {
          const selectable = selectableDays.includes(d);
          return (
            <span
              key={d}
              onClick={
                selectable
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDay(d);
                    }
                  : undefined
              }
              style={dayStyle(d, selectable)}
            >
              {d}
            </span>
          );
        })}
        {/* week of 23–29 */}
        {[23, 24, 25, 26, 27].map((d) => {
          const selectable = selectableDays.includes(d);
          return (
            <span
              key={d}
              onClick={
                selectable
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDay(d);
                    }
                  : undefined
              }
              style={dayStyle(d, selectable)}
            >
              {d}
            </span>
          );
        })}
        {[28, 29].map((d) => (
          <span key={d} style={{ padding: "7px 0", color: "#dde7e2" }}>
            {d}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9bb3a8]">
          Thu, Jun {day} · times
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {slots.map((s) => {
            const active = s === slot;
            return (
              <span
                key={s}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlot(s);
                }}
                className="cursor-pointer rounded-[9px] text-center text-[13px] font-bold"
                style={{
                  padding: "9px 0",
                  color: active ? "#fff" : "#0a6b54",
                  background: active ? "#064e3b" : "transparent",
                  border: active ? "1.5px solid #064e3b" : "1px solid #d3e6dc",
                }}
              >
                {s}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-[11px] bg-[#064e3b] py-[13px] text-[14px] font-bold text-white">
        Confirm Thu {slot} <span style={{ lineHeight: 0, fontSize: 16 }}>→</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.02em] text-[#9bb3a8]">
        Free · 30 min · Google Meet · no pitch
      </div>
    </a>
  );
}
