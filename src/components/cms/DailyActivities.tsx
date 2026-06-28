"use client";

import { useState, useTransition } from "react";
import {
  addDailyActivity,
  editDailyActivity,
  deleteDailyActivity,
  setDailyLog,
} from "@/app/cms/actions/daily";

export type DailyActivityDTO = {
  id: string;
  name: string;
  unit: string | null;
  dailyTarget: number;
  counts: Record<string, number>;
  monthDone: number;
  pct: number;
};
export type DailyDTO = {
  monthLabel: string;
  daysElapsed: number;
  overallPct: number | null;
  days: { day: number; dateStr: string; isToday: boolean; isFuture: boolean }[];
  activities: DailyActivityDTO[];
};

export default function DailyActivities({
  clientId,
  daily,
  canEdit,
}: {
  clientId: string;
  daily: DailyDTO;
  canEdit: boolean;
}) {
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  // Show nothing for clients with no activities unless staff can add them.
  if (daily.activities.length === 0 && !canEdit) return null;

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[14.5px] font-semibold">Daily Activities</div>
        <div className="text-[12px] text-[#71807a]">
          {daily.monthLabel}
          {daily.overallPct != null && (
            <>
              {" · "}
              <span className="font-semibold text-[#064e3b]">
                {daily.overallPct}%
              </span>{" "}
              kept up
            </>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
        <div className="overflow-x-auto">
          <div style={{ minWidth: 320 + daily.days.length * 34 }}>
            {/* Header: day numbers */}
            <div className="flex border-b border-[#e6eae8] bg-[#f8faf9]">
              <div className="w-[320px] flex-shrink-0 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
                Activity
              </div>
              <div className="flex">
                {daily.days.map((d) => (
                  <div
                    key={d.dateStr}
                    className="w-[34px] flex-shrink-0 py-2 text-center text-[10px] font-semibold"
                    style={{ color: d.isToday ? "#064e3b" : "#9aa3a0" }}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
            </div>

            {daily.activities.map((a) => (
              <div
                key={a.id}
                className="row flex items-stretch border-b border-[#eef2f0] last:border-b-0"
              >
                {/* Left: name + target + monthly progress */}
                <div className="w-[320px] flex-shrink-0 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {canEdit ? (
                      <input
                        defaultValue={a.name}
                        key={`n-${a.id}-${a.name}`}
                        onBlur={(e) =>
                          e.target.value.trim() !== a.name &&
                          run(() =>
                            editDailyActivity(a.id, { name: e.target.value }),
                          )
                        }
                        className="min-w-0 flex-1 rounded-[6px] border border-transparent bg-transparent px-1 py-0.5 font-[inherit] text-[13px] font-semibold outline-none hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white"
                      />
                    ) : (
                      <span className="text-[13px] font-semibold">{a.name}</span>
                    )}
                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => run(() => deleteDailyActivity(a.id))}
                        className="delx cursor-pointer border-none bg-transparent text-[15px] text-[#c64242]"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#71807a]">
                    <span>Target</span>
                    {canEdit ? (
                      <input
                        type="number"
                        min={1}
                        defaultValue={a.dailyTarget}
                        key={`t-${a.id}-${a.dailyTarget}`}
                        onBlur={(e) =>
                          Number(e.target.value) !== a.dailyTarget &&
                          run(() =>
                            editDailyActivity(a.id, {
                              dailyTarget: Number(e.target.value),
                            }),
                          )
                        }
                        className="w-[44px] rounded-[5px] border border-[#e0e5e3] px-1 py-0.5 font-[inherit] text-[11px] outline-none focus:border-[#064e3b]"
                      />
                    ) : (
                      <span className="font-semibold">{a.dailyTarget}</span>
                    )}
                    <span>/day</span>
                    {canEdit ? (
                      <input
                        defaultValue={a.unit ?? ""}
                        key={`u-${a.id}-${a.unit}`}
                        onBlur={(e) =>
                          (e.target.value.trim() || null) !== a.unit &&
                          run(() =>
                            editDailyActivity(a.id, { unit: e.target.value }),
                          )
                        }
                        placeholder="unit"
                        className="w-[72px] rounded-[5px] border border-transparent bg-transparent px-1 py-0.5 font-[inherit] text-[11px] outline-none hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white"
                      />
                    ) : (
                      a.unit && <span>{a.unit}</span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-[5px] w-[120px] overflow-hidden rounded-[3px] bg-[#eef2f0]">
                      <div
                        className="h-full rounded-[3px] bg-[#064e3b]"
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#71807a]">
                      {a.monthDone}/{a.dailyTarget * daily.daysElapsed} ·{" "}
                      <span className="font-semibold text-[#064e3b]">{a.pct}%</span>
                    </span>
                  </div>
                </div>

                {/* Day cells */}
                <div className="flex">
                  {daily.days.map((d) => {
                    const v = a.counts[d.dateStr];
                    const met = v != null && v >= a.dailyTarget;
                    const partial = v != null && v > 0 && v < a.dailyTarget;
                    const bg = met ? "#e3f3ea" : partial ? "#fff4e0" : "transparent";
                    return (
                      <div
                        key={d.dateStr}
                        className="w-[34px] flex-shrink-0 border-l border-[#f1f4f3] p-[2px]"
                        style={{ opacity: d.isFuture ? 0.4 : 1 }}
                      >
                        {canEdit ? (
                          <input
                            type="number"
                            min={0}
                            defaultValue={v ?? ""}
                            key={`c-${a.id}-${d.dateStr}-${v ?? ""}`}
                            disabled={d.isFuture}
                            onBlur={(e) => {
                              const nv = e.target.value === "" ? 0 : Number(e.target.value);
                              if (nv !== (v ?? 0))
                                run(() => setDailyLog(a.id, d.dateStr, nv));
                            }}
                            className="h-[30px] w-full rounded-[5px] border-none text-center font-[inherit] text-[11px] outline-none focus:ring-1 focus:ring-[#064e3b]"
                            style={{
                              background: bg,
                              color: met ? "#0a7a4f" : "#4a5752",
                              ...(d.isToday ? { boxShadow: "inset 0 0 0 1.5px #064e3b" } : {}),
                            }}
                          />
                        ) : (
                          <div
                            className="flex h-[30px] w-full items-center justify-center rounded-[5px] text-[11px]"
                            style={{ background: bg, color: met ? "#0a7a4f" : "#4a5752" }}
                          >
                            {v ?? ""}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {canEdit && <AddActivity clientId={clientId} disabled={pending} run={run} />}
      </div>

      {canEdit && (
        <div className="mt-2 text-[11.5px] text-[#9aa3a0]">
          Add the recurring daily quotas for this client (e.g. 20 comments/day).
          Green = quota met that day. % = total done vs. target so far this month.
        </div>
      )}
    </div>
  );
}

function AddActivity({
  clientId,
  disabled,
  run,
}: {
  clientId: string;
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("20");
  const [unit, setUnit] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    run(() => addDailyActivity(clientId, name, Number(target) || 1, unit));
    setName("");
    setTarget("20");
    setUnit("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[#eef2f0] px-4 py-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Activity (e.g. Comments)"
        className="min-w-[160px] flex-1 rounded-[8px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <input
        type="number"
        min={1}
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-[70px] rounded-[8px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <span className="text-[12px] text-[#9aa3a0]">/day</span>
      <input
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="unit"
        className="w-[110px] rounded-[8px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="cursor-pointer whitespace-nowrap rounded-[8px] border-none bg-[#064e3b] px-[15px] py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
      >
        Add activity
      </button>
    </div>
  );
}
