"use client";

import { useState, useTransition } from "react";
import StatusPill from "./StatusPill";
import {
  addIntern,
  toggleInternEdit,
  deleteIntern,
  toggleInternClientAccess,
} from "@/app/cms/actions/interns";
import { addTask, deleteTask, cycleTask } from "@/app/cms/actions/tasks";

export type TeamTaskDTO = {
  id: string;
  title: string;
  clientName: string;
  due: string;
  status: string;
};
export type InternDTO = {
  id: string;
  name: string;
  initials: string;
  email: string;
  canEdit: boolean;
  clientIds: string[];
  tasks: TeamTaskDTO[];
};

export default function TeamAccess({
  interns,
  clients,
}: {
  interns: InternDTO[];
  clients: { id: string; name: string }[];
}) {
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  return (
    <div>
      <div className="mb-4 text-[12.5px] text-[#71807a]">
        Create intern logins, decide which clients each can access, and assign
        their tasks. Interns only ever see what you grant here.
      </div>

      <div className="flex flex-col gap-[18px]">
        {interns.map((it) => (
          <InternCard
            key={it.id}
            intern={it}
            clients={clients}
            pending={pending}
            run={run}
          />
        ))}

        <AddInternCard disabled={pending} run={run} />
      </div>
    </div>
  );
}

function InternCard({
  intern,
  clients,
  pending,
  run,
}: {
  intern: InternDTO;
  clients: { id: string; name: string }[];
  pending: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const summary = `${intern.clientIds.length} client${
    intern.clientIds.length === 1 ? "" : "s"
  } · ${intern.tasks.length} tasks · ${
    intern.canEdit ? "can" : "can't"
  } edit deliverables`;

  return (
    <div className="rounded-[14px] border border-[#e6eae8] bg-white px-[22px] py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[11px] bg-[#ecf3f0] text-[15px] font-bold text-[#064e3b]">
          {intern.initials}
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold">{intern.name}</div>
          <div className="text-[12px] text-[#71807a]">
            {intern.email} · {summary}
          </div>
        </div>

        <button
          type="button"
          onClick={() => run(() => toggleInternEdit(intern.id))}
          className="relative h-[23px] w-10 flex-shrink-0 cursor-pointer rounded-[14px] border-none"
          style={{ background: intern.canEdit ? "#064e3b" : "#d4dad7" }}
          aria-pressed={intern.canEdit}
        >
          <span
            className="absolute top-[3px] h-[17px] w-[17px] rounded-full bg-white transition-all"
            style={{ left: intern.canEdit ? 20 : 3 }}
          />
        </button>
        <div className="w-[118px] text-[12px] text-[#4a5752]">
          Can edit deliverables
        </div>
        <button
          type="button"
          onClick={() => run(() => deleteIntern(intern.id))}
          className="ml-1.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border-none bg-transparent text-[18px] text-[#c64242] hover:bg-[#fdeaea]"
        >
          ×
        </button>
      </div>

      <div className="mb-[9px] mt-[18px] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#71807a]">
        Client Access
      </div>
      <div className="flex flex-wrap gap-2">
        {clients.map((c) => {
          const on = intern.clientIds.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => run(() => toggleInternClientAccess(intern.id, c.id))}
              className="flex cursor-pointer items-center gap-1.5 rounded-[9px] px-[13px] py-[7px] text-[12.5px] font-semibold"
              style={
                on
                  ? { background: "#064e3b", color: "#fff", border: "1px solid #064e3b" }
                  : { background: "#fff", color: "#71807a", border: "1px solid #e0e5e3" }
              }
            >
              <span className="text-[13px]">{on ? "✓" : "+"}</span> {c.name}
            </button>
          );
        })}
      </div>

      <div className="mb-[9px] mt-5 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#71807a]">
        Assigned Tasks
      </div>
      <div className="flex flex-col gap-[7px]">
        {intern.tasks.map((t) => (
          <div
            key={t.id}
            className="row flex items-center gap-3 rounded-[10px] border border-[#eef2f0] bg-[#f8faf9] px-[13px] py-2.5"
          >
            <div className="flex-1 text-[13px] font-medium">{t.title}</div>
            <div className="w-[120px] text-[11.5px] text-[#71807a]">
              {t.clientName}
            </div>
            <div className="w-16 text-[11.5px] text-[#9aa3a0]">{t.due}</div>
            <StatusPill
              status={t.status}
              pending={pending}
              onClick={() => run(() => cycleTask(t.id))}
            />
            <button
              type="button"
              onClick={() => run(() => deleteTask(t.id))}
              className="delx w-[18px] cursor-pointer border-none bg-transparent text-center text-[16px] text-[#c64242]"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <AddTaskRow internId={intern.id} clients={clients} disabled={pending} run={run} />
    </div>
  );
}

function AddTaskRow({
  internId,
  clients,
  disabled,
  run,
}: {
  internId: string;
  clients: { id: string; name: string }[];
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("personal");

  const submit = () => {
    if (!title.trim()) return;
    run(() => addTask(internId, title, client === "personal" ? null : client));
    setTitle("");
  };

  return (
    <div className="mt-[11px] flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="New task for this intern…"
        className="flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <select
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="w-[150px] rounded-[9px] border border-[#e0e5e3] bg-white px-[11px] py-[9px] font-[inherit] text-[12.5px] text-[#4a5752] outline-none"
      >
        <option value="personal">Personal task</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="cursor-pointer whitespace-nowrap rounded-[9px] border-none bg-[#064e3b] px-4 py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
      >
        Assign
      </button>
    </div>
  );
}

function AddInternCard({
  disabled,
  run,
}: {
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim()) return;
    setError(null);
    run(async () => {
      const res = await addIntern(name, email);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setName("");
      setEmail("");
    });
  };

  return (
    <div className="rounded-[14px] border border-dashed border-[#cdd6d2] bg-white px-[22px] py-[18px]">
      <div className="mb-2.5 text-[13px] font-semibold">
        Create a new intern login
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="min-w-[160px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Login email"
          className="min-w-[160px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled}
          className="cursor-pointer whitespace-nowrap rounded-[9px] border-none bg-[#064e3b] px-[18px] py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
        >
          Add intern
        </button>
      </div>
      {error && <div className="mt-2 text-[12px] text-[#c64242]">{error}</div>}
    </div>
  );
}
