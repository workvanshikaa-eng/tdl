"use client";

import { useTransition } from "react";
import StatusPill from "./StatusPill";
import TaskProgress from "./TaskProgress";
import { cycleTask } from "@/app/cms/actions/tasks";

export type TaskDTO = {
  id: string;
  title: string;
  clientName: string;
  due: string;
  status: string;
  unit: string | null;
  targetCount: number | null;
  doneCount: number | null;
};

export default function MyTasksList({ tasks }: { tasks: TaskDTO[] }) {
  const [pending, start] = useTransition();
  return (
    <div className="overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
      {tasks.length === 0 && (
        <div className="px-5 py-6 text-[12.5px] text-[#9aa3a0]">
          No tasks assigned yet.
        </div>
      )}
      {tasks.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3.5 border-b border-[#eef2f0] px-5 py-3.5 last:border-b-0"
        >
          <div className="flex-1">
            <div className="text-[13.5px] font-medium">{t.title}</div>
            <div className="mt-0.5 text-[11.5px] text-[#9aa3a0]">
              {t.clientName} · {t.due}
            </div>
            <TaskProgress task={t} />
          </div>
          <StatusPill
            status={t.status}
            pending={pending}
            onClick={() => start(() => void cycleTask(t.id))}
          />
        </div>
      ))}
    </div>
  );
}
