"use client";

import { useState, useTransition } from "react";
import { updateTaskProgress } from "@/app/cms/actions/tasks";

export type TaskProgressData = {
  id: string;
  unit: string | null;
  targetCount: number | null;
  doneCount: number | null;
};

export function taskPct(t: {
  targetCount: number | null;
  doneCount: number | null;
}): number | null {
  if (!t.targetCount || t.targetCount <= 0) return null;
  return Math.min(100, Math.round(((t.doneCount ?? 0) / t.targetCount) * 100));
}

/**
 * Compact, expandable quantitative progress for a task.
 * Optional: set a target count + unit (e.g. 12 blogs) and how many are done.
 */
export default function TaskProgress({ task }: { task: TaskProgressData }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const pct = taskPct(task);
  const hasTarget = task.targetCount != null && task.targetCount > 0;

  const save = (patch: {
    unit?: string | null;
    targetCount?: number | null;
    doneCount?: number | null;
  }) => start(() => void updateTaskProgress(task.id, patch));

  const numInput =
    "w-[64px] rounded-[7px] border border-[#e0e5e3] px-2 py-1 font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]";

  return (
    <div className="mt-1.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 cursor-pointer border-none bg-transparent p-0 text-[11.5px] font-medium text-[#71807a] hover:text-[#064e3b]"
      >
        <span style={{ transform: open ? "rotate(90deg)" : "none", transition: ".15s" }}>
          ▸
        </span>
        {hasTarget ? (
          <span>
            {task.doneCount ?? 0}/{task.targetCount} {task.unit || "done"} ·{" "}
            <span className="font-semibold text-[#064e3b]">{pct}%</span>
          </span>
        ) : (
          <span>Add a target</span>
        )}
      </button>

      {hasTarget && (
        <div className="mt-1 h-[6px] w-full max-w-[260px] overflow-hidden rounded-[4px] bg-[#eef2f0]">
          <div
            className="h-full rounded-[4px] bg-[#064e3b]"
            style={{ width: `${pct ?? 0}%` }}
          />
        </div>
      )}

      {open && (
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-[9px] border border-[#eef2f0] bg-[#f8faf9] px-3 py-2.5">
          <label className="text-[11px] font-medium text-[#71807a]">Done</label>
          <input
            type="number"
            min={0}
            defaultValue={task.doneCount ?? ""}
            key={`d-${task.id}-${task.doneCount}`}
            onBlur={(e) =>
              save({
                doneCount: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={numInput}
            placeholder="0"
          />
          <span className="text-[12.5px] text-[#9aa3a0]">of</span>
          <label className="text-[11px] font-medium text-[#71807a]">Target</label>
          <input
            type="number"
            min={0}
            defaultValue={task.targetCount ?? ""}
            key={`t-${task.id}-${task.targetCount}`}
            onBlur={(e) =>
              save({
                targetCount:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={numInput}
            placeholder="12"
          />
          <input
            defaultValue={task.unit ?? ""}
            key={`u-${task.id}-${task.unit}`}
            onBlur={(e) => save({ unit: e.target.value })}
            placeholder="unit (e.g. blogs)"
            className="w-[140px] rounded-[7px] border border-[#e0e5e3] px-2 py-1 font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
          />
          {pending && <span className="text-[11px] text-[#9aa3a0]">saving…</span>}
        </div>
      )}
    </div>
  );
}
