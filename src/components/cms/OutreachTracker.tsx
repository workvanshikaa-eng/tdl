"use client";

import { useState, useTransition } from "react";
import {
  LINKEDIN_STATUSES,
  EMAIL_STATUSES,
  outreachColor,
  type Channel,
} from "@/lib/constants";
import {
  addProspect,
  setProspectStatus,
  editProspect,
  deleteProspect,
} from "@/app/cms/actions/prospects";

export type ProspectDTO = {
  id: string;
  clientId: string;
  clientName: string;
  channel: string;
  name: string;
  url: string;
  email: string;
  role: string;
  company: string;
  status: string;
  notes: string;
  dateLabel: string;
};

const inputBase =
  "w-full rounded-[6px] border border-transparent bg-transparent px-1.5 py-[5px] font-[inherit] outline-none hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white";

export default function OutreachTracker({
  prospects,
  clients,
}: {
  prospects: ProspectDTO[];
  clients: { id: string; name: string }[];
}) {
  const [channel, setChannel] = useState<Channel>("linkedin");
  const [campaign, setCampaign] = useState<string>("all"); // "all" | clientId
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  const isEmail = channel === "email";
  const statusOptions = isEmail ? EMAIL_STATUSES : LINKEDIN_STATUSES;

  const visible = prospects
    .filter((p) => (p.channel || "linkedin") === channel)
    .filter((p) => campaign === "all" || p.clientId === campaign);

  const handleAdd = () => {
    const targetClient =
      campaign !== "all" ? campaign : clients[0]?.id;
    if (!targetClient) return;
    run(() => addProspect(targetClient, channel));
  };

  const channelTabs: { k: Channel; label: string; icon: string }[] = [
    { k: "linkedin", label: "LinkedIn", icon: "in" },
    { k: "email", label: "Email", icon: "✉" },
  ];

  const filters = [{ k: "all", name: "All campaigns" }].concat(
    clients.map((c) => ({ k: c.id, name: c.name })),
  );

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-[3px] rounded-[10px] bg-[#eef2f0] p-[3px]">
          {channelTabs.map((t) => {
            const active = channel === t.k;
            return (
              <button
                key={t.k}
                type="button"
                onClick={() => setChannel(t.k)}
                className="flex cursor-pointer items-center gap-1.5 rounded-[8px] border-none px-[15px] py-[7px] text-[12.5px] font-semibold"
                style={
                  active
                    ? { background: "#fff", color: "#064e3b", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : { background: "transparent", color: "#71807a" }
                }
              >
                <span className="text-[13px]">{t.icon}</span> {t.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={pending}
          className="cursor-pointer whitespace-nowrap rounded-[9px] border-none bg-[#064e3b] px-[15px] py-2 text-[12.5px] font-semibold text-white disabled:opacity-60"
        >
          {isEmail ? "＋ Add contact" : "＋ Add prospect"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const active = campaign === f.k;
          return (
            <button
              key={f.k}
              type="button"
              onClick={() => setCampaign(f.k)}
              className="cursor-pointer rounded-[8px] px-[13px] py-[7px] text-[12.5px] font-medium"
              style={
                active
                  ? { background: "#064e3b", color: "#fff", border: "1px solid #064e3b" }
                  : { background: "#fff", color: "#4a5752", border: "1px solid #e0e5e3" }
              }
            >
              {f.name}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
        <div className="overflow-x-auto">
          <div className="min-w-[1140px]">
            <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1fr_1.6fr_1.1fr_0.7fr_0.3fr] gap-3 border-b border-[#e6eae8] bg-[#f8faf9] px-[22px] py-[13px] text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
              <div>{isEmail ? "Name / Email" : "Name / Profile"}</div>
              <div>Role</div>
              <div>Company</div>
              <div>Client</div>
              <div>Status</div>
              <div>Notes</div>
              <div>Last</div>
              <div />
            </div>

            {visible.length === 0 && (
              <div className="px-[22px] py-6 text-[12.5px] text-[#9aa3a0]">
                No {isEmail ? "contacts" : "prospects"} yet. Use “Add” to create one.
              </div>
            )}

            {visible.map((r) => {
              const c = outreachColor(r.status);
              return (
                <div
                  key={r.id}
                  className="row grid grid-cols-[1.4fr_1fr_1.2fr_1fr_1.6fr_1.1fr_0.7fr_0.3fr] items-center gap-3 border-b border-[#eef2f0] px-[22px] py-[9px] last:border-b-0"
                >
                  <div>
                    <input
                      defaultValue={r.name}
                      key={`n-${r.id}-${r.name}`}
                      placeholder="Name"
                      onBlur={(e) =>
                        e.target.value !== r.name &&
                        run(() => editProspect(r.id, "name", e.target.value))
                      }
                      className={`${inputBase} text-[13px] font-semibold text-[#0f1f1a]`}
                    />
                    <input
                      defaultValue={isEmail ? r.email : r.url}
                      key={`s-${r.id}-${isEmail ? r.email : r.url}`}
                      placeholder={isEmail ? "name@company.com" : "LinkedIn URL"}
                      onBlur={(e) =>
                        run(() =>
                          editProspect(
                            r.id,
                            isEmail ? "email" : "url",
                            e.target.value,
                          ),
                        )
                      }
                      className={`${inputBase} !py-[2px] text-[11px] text-[#0a7a5a]`}
                    />
                  </div>
                  <input
                    defaultValue={r.role}
                    key={`r-${r.id}-${r.role}`}
                    placeholder="Role"
                    onBlur={(e) =>
                      e.target.value !== r.role &&
                      run(() => editProspect(r.id, "role", e.target.value))
                    }
                    className={`${inputBase} text-[12.5px] text-[#4a5752]`}
                  />
                  <input
                    defaultValue={r.company}
                    key={`co-${r.id}-${r.company}`}
                    placeholder="Company"
                    onBlur={(e) =>
                      e.target.value !== r.company &&
                      run(() => editProspect(r.id, "company", e.target.value))
                    }
                    className={`${inputBase} text-[12.5px] text-[#4a5752]`}
                  />
                  <div className="text-[11.5px] text-[#71807a]">{r.clientName}</div>
                  <select
                    value={r.status}
                    onChange={(e) =>
                      run(() => setProspectStatus(r.id, e.target.value))
                    }
                    className="w-full cursor-pointer rounded-[7px] px-2 py-1.5 font-[inherit] text-[11.5px] font-semibold outline-none"
                    style={{ background: c.bg, color: c.fg, border: `1px solid ${c.bd}` }}
                  >
                    {statusOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <input
                    defaultValue={r.notes}
                    key={`no-${r.id}-${r.notes}`}
                    placeholder="Notes"
                    onBlur={(e) =>
                      e.target.value !== r.notes &&
                      run(() => editProspect(r.id, "notes", e.target.value))
                    }
                    className={`${inputBase} text-[12px] text-[#71807a]`}
                  />
                  <div className="text-[12px] text-[#71807a]">{r.dateLabel}</div>
                  <button
                    type="button"
                    onClick={() => run(() => deleteProspect(r.id))}
                    className="delx cursor-pointer border-none bg-transparent text-center text-[17px] text-[#c64242]"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
