"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusPill from "./StatusPill";
import {
  cycleDeliverable,
  editDeliverable,
  deleteDeliverable,
  addDeliverable,
} from "@/app/cms/actions/deliverables";
import { addNote, deleteNote } from "@/app/cms/actions/notes";
import { addClient } from "@/app/cms/actions/clients";

export type DeliverableDTO = {
  id: string;
  name: string;
  due: string;
  status: string;
};
export type NoteDTO = {
  id: string;
  author: string;
  initials: string;
  time: string;
  text: string;
};
export type ClientDTO = {
  id: string;
  name: string;
  initials: string;
  service: string;
  tenure: string;
  pct: number;
  deliverables: DeliverableDTO[];
  notes: NoteDTO[];
};

export default function ClientDashboard({
  client,
  canEditDeliverables,
  canAddNote,
  picker,
}: {
  client: ClientDTO;
  canEditDeliverables: boolean;
  canAddNote: boolean;
  /** Admin client switcher; omit for intern/client views. */
  picker?: { id: string; name: string }[];
}) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  const notesTitle = canAddNote
    ? "Internal Notes & Updates"
    : "Updates from your team";

  return (
    <div>
      {picker && (
        <ClientPicker picker={picker} selectedId={client.id} />
      )}

      {/* Header card */}
      <div className="flex items-center gap-4 rounded-[13px] border border-[#e6eae8] bg-white px-[22px] py-5">
        <div className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-[13px] bg-[#064e3b] text-[21px] font-bold tracking-[-0.5px] text-[#dff0e9]">
          {client.initials}
        </div>
        <div className="flex-1">
          <div className="text-[19px] font-bold tracking-[-0.4px]">
            {client.name}
          </div>
          <div className="mt-[5px] flex items-center gap-2">
            <span className="rounded-[6px] bg-[#ecf3f0] px-2.5 py-1 text-[11.5px] font-semibold text-[#064e3b]">
              {client.service}
            </span>
            <span className="text-[12px] text-[#71807a]">{client.tenure}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[34px] font-bold tracking-[-1.5px] text-[#064e3b]">
            {client.pct}%
          </div>
          <div className="text-[11.5px] text-[#71807a]">deliverables done</div>
        </div>
      </div>
      <div className="mb-1.5 mt-3.5">
        <div className="h-[9px] overflow-hidden rounded-[6px] bg-[#eef2f0]">
          <div
            className="h-full rounded-[6px] bg-[#064e3b]"
            style={{ width: `${client.pct}%` }}
          />
        </div>
      </div>

      <div className="mt-[22px] grid grid-cols-[1.7fr_1fr] items-start gap-5 max-[900px]:grid-cols-1">
        {/* Deliverables */}
        <div>
          <div className="mb-3 text-[14.5px] font-semibold">
            Monthly Deliverables
          </div>
          <div className="overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
            {client.deliverables.map((d) => (
              <div
                key={d.id}
                className="row flex items-center justify-between gap-3 border-b border-[#eef2f0] px-[18px] py-[11px] last:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <input
                    defaultValue={d.name}
                    key={`name-${d.id}-${d.name}`}
                    disabled={!canEditDeliverables}
                    onBlur={(e) => {
                      if (e.target.value !== d.name)
                        run(() =>
                          editDeliverable(d.id, "name", e.target.value),
                        );
                    }}
                    className="w-full rounded-[6px] border border-transparent bg-transparent px-1.5 py-1 font-[inherit] text-[13.5px] font-medium text-[#0f1f1a] outline-none enabled:hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white"
                  />
                  <input
                    defaultValue={d.due}
                    key={`due-${d.id}-${d.due}`}
                    disabled={!canEditDeliverables}
                    onBlur={(e) => {
                      if (e.target.value !== d.due)
                        run(() => editDeliverable(d.id, "due", e.target.value));
                    }}
                    className="w-full rounded-[6px] border border-transparent bg-transparent px-1.5 py-px font-[inherit] text-[11.5px] text-[#9aa3a0] outline-none enabled:hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white"
                  />
                </div>
                <StatusPill
                  status={d.status}
                  pending={pending}
                  onClick={
                    canEditDeliverables
                      ? () => run(() => cycleDeliverable(d.id))
                      : undefined
                  }
                />
                {canEditDeliverables && (
                  <button
                    type="button"
                    onClick={() => run(() => deleteDeliverable(d.id))}
                    className="delx w-[18px] cursor-pointer border-none bg-transparent text-center text-[17px] text-[#c64242]"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {canEditDeliverables && (
              <AddDeliverable clientId={client.id} disabled={pending} run={run} />
            )}
          </div>
          {canEditDeliverables && (
            <div className="mt-2 text-[11.5px] text-[#9aa3a0]">
              Click a status tag to advance it · click any field to edit.
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <div className="mb-3 text-[14.5px] font-semibold">{notesTitle}</div>
          <div className="rounded-[13px] border border-[#e6eae8] bg-white p-4">
            <div className="flex flex-col gap-3.5">
              {client.notes.length === 0 && (
                <div className="text-[12.5px] text-[#9aa3a0]">No updates yet.</div>
              )}
              {client.notes.map((n) => (
                <div key={n.id} className="row flex gap-[11px]">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ecf3f0] text-[11px] font-semibold text-[#064e3b]">
                    {n.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[12px]">
                      <span>
                        <span className="font-semibold">{n.author}</span>{" "}
                        <span className="text-[#9aa3a0]">· {n.time}</span>
                      </span>
                      {canAddNote && (
                        <button
                          type="button"
                          onClick={() => run(() => deleteNote(n.id))}
                          className="delx cursor-pointer border-none bg-transparent text-[#c64242]"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-[1.45] text-[#4a5752]">
                      {n.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {canAddNote && (
              <AddNote clientId={client.id} disabled={pending} run={run} />
            )}
          </div>
        </div>
      </div>

      {picker && (
        <NewClientInline
          onCreated={() => router.refresh()}
          disabled={pending}
          run={run}
        />
      )}
    </div>
  );
}

function ClientPicker({
  picker,
  selectedId,
}: {
  picker: { id: string; name: string }[];
  selectedId: string;
}) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-2">
      <span className="mr-0.5 text-[12px] text-[#71807a]">Account:</span>
      {picker.map((p) => {
        const active = p.id === selectedId;
        return (
          <Link
            key={p.id}
            href={`/cms/client/${p.id}`}
            className="rounded-[20px] px-3 py-1.5 text-[12px] font-semibold no-underline"
            style={
              active
                ? { background: "#064e3b", color: "#fff", border: "1px solid #064e3b" }
                : { background: "#fff", color: "#4a5752", border: "1px solid #e0e5e3" }
            }
          >
            {p.name}
          </Link>
        );
      })}
    </div>
  );
}

function AddDeliverable({
  clientId,
  disabled,
  run,
}: {
  clientId: string;
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    run(() => addDeliverable(clientId, value));
    setValue("");
  };
  return (
    <div className="flex gap-2 px-4 py-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add a deliverable…"
        className="flex-1 rounded-[8px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="cursor-pointer whitespace-nowrap rounded-[8px] border-none bg-[#064e3b] px-[15px] py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
      >
        Add
      </button>
    </div>
  );
}

function AddNote({
  clientId,
  disabled,
  run,
}: {
  clientId: string;
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    run(() => addNote(clientId, value));
    setValue("");
  };
  return (
    <div className="mt-4 flex gap-2 border-t border-[#eef2f0] pt-3.5">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add an internal note…"
        className="flex-1 rounded-[8px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="cursor-pointer whitespace-nowrap rounded-[8px] border-none bg-[#064e3b] px-[15px] py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
      >
        Post
      </button>
    </div>
  );
}

function NewClientInline({
  disabled,
  run,
}: {
  onCreated: () => void;
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    run(async () => {
      await addClient(name, service, email);
      setName("");
      setService("");
      setEmail("");
      setOpen(false);
    });
  };

  return (
    <div className="mt-[18px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-[20px] border border-dashed border-[#cdd6d2] bg-transparent px-3 py-1.5 text-[12px] font-semibold text-[#71807a]"
      >
        ＋ New client
      </button>
      {open && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-[12px] border border-[#e6eae8] bg-white px-4 py-3.5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client name"
            className="min-w-[150px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
          />
          <input
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service (e.g. SEO Retainer)"
            className="min-w-[150px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Login email"
            className="min-w-[150px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
          />
          <button
            type="button"
            onClick={submit}
            disabled={disabled}
            className="cursor-pointer whitespace-nowrap rounded-[9px] border-none bg-[#064e3b] px-[18px] py-[9px] text-[12.5px] font-semibold text-white disabled:opacity-60"
          >
            Create account
          </button>
        </div>
      )}
    </div>
  );
}
