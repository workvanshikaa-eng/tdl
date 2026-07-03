"use client";

import { useState, useTransition } from "react";
import { updateDeliverableProgress } from "@/app/cms/actions/deliverables";

export type DeliverableProgressData = {
  id: string;
  unit: string | null;
  targetCount: number | null;
  doneCount: number | null;
};

export function deliverablePct(t: {
  targetCount: number | null;
  doneCount: number | null;
}): number | null {
  if (!t.targetCount || t.targetCount <= 0) return null;
  return Math.min(100, Math.round(((t.doneCount ?? 0) / t.targetCount) * 100));
}

/**
 * Compact, expandable quantitative progress for a deliverable.
 * Optional: set a total count + unit (e.g. 22 Medium posts) and how many are done.
 */
export default function DeliverableProgress({
  deliverable,
  editable,
}: {
  deliverable: DeliverableProgressData;
  editable: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const pct = deliverablePct(deliverable);
  const hasTarget = deliverable.targetCount != null && deliverable.targetCount > 0;

  // Nothing to show for a read-only viewer if no target was ever set.
  if (!hasTarget && !editable) return null;

  const save = (patch: {
    unit?: string | null;
    targetCount?: number | null;
    doneCount?: number | null;
  }) => start(() => void updateDeliverableProgress(deliverable.id, patch));

  const numInput =
    "w-[64px] rounded-[7px] border border-[#e0e5e3] px-2 py-1 font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]";

  return (
    <div className="mt-1">
      {editable ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-[11px] font-medium text-[#71807a] hover:text-[#064e3b]"
        >
          <span style={{ transform: open ? "rotate(90deg)" : "none", transition: ".15s" }}>
            ▸
          </span>
          {hasTarget ? (
            <span>
              {deliverable.doneCount ?? 0}/{deliverable.targetCount}{" "}
              {deliverable.unit || "done"} ·{" "}
              <span className="font-semibold text-[#064e3b]">{pct}%</span>
            </span>
          ) : (
            <span>Add a count</span>
          )}
        </button>
      ) : (
        hasTarget && (
          <div className="text-[11px] font-medium text-[#71807a]">
            {deliverable.doneCount ?? 0}/{deliverable.targetCount}{" "}
            {deliverable.unit || "done"} ·{" "}
            <span className="font-semibold text-[#064e3b]">{pct}%</span>
          </div>
        )
      )}

      {hasTarget && (
        <div className="mt-1 h-[5px] w-full max-w-[220px] overflow-hidden rounded-[3px] bg-[#eef2f0]">
          <div
            className="h-full rounded-[3px] bg-[#064e3b]"
            style={{ width: `${pct ?? 0}%` }}
          />
        </div>
      )}

      {editable && open && (
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-[9px] border border-[#eef2f0] bg-[#f8faf9] px-3 py-2.5">
          <label className="text-[11px] font-medium text-[#71807a]">Done</label>
          <input
            type="number"
            min={0}
            defaultValue={deliverable.doneCount ?? ""}
            key={`d-${deliverable.id}-${deliverable.doneCount}`}
            onBlur={(e) =>
              save({
                doneCount: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={numInput}
            placeholder="0"
          />
          <span className="text-[12.5px] text-[#9aa3a0]">of</span>
          <label className="text-[11px] font-medium text-[#71807a]">Total</label>
          <input
            type="number"
            min={0}
            defaultValue={deliverable.targetCount ?? ""}
            key={`t-${deliverable.id}-${deliverable.targetCount}`}
            onBlur={(e) =>
              save({
                targetCount:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={numInput}
            placeholder="22"
          />
          <input
            defaultValue={deliverable.unit ?? ""}
            key={`u-${deliverable.id}-${deliverable.unit}`}
            onBlur={(e) => save({ unit: e.target.value })}
            placeholder="unit (e.g. posts)"
            className="w-[130px] rounded-[7px] border border-[#e0e5e3] px-2 py-1 font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
          />
          {pending && <span className="text-[11px] text-[#9aa3a0]">saving…</span>}
        </div>
      )}
    </div>
  );
}
