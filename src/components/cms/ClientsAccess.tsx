"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addClient, editClient, deleteClient } from "@/app/cms/actions/clients";

export type ClientCardDTO = {
  id: string;
  name: string;
  initials: string;
  tenure: string;
  service: string;
  email: string;
  pct: number;
};

export default function ClientsAccess({ clients }: { clients: ClientCardDTO[] }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  return (
    <div>
      <div className="mb-4 text-[12.5px] text-[#71807a]">
        Create client portal logins, set their service and remove access. Each
        client signs in to see only their own dashboard, progress and updates.
      </div>

      <div className="flex flex-col gap-3.5">
        {clients.map((c) => (
          <div
            key={c.id}
            className="rounded-[14px] border border-[#e6eae8] bg-white px-[22px] py-[18px]"
          >
            <div className="flex items-center gap-[13px]">
              <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[11px] bg-[#064e3b] text-[15px] font-bold text-[#dff0e9]">
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold">{c.name}</div>
                <div className="text-[12px] text-[#71807a]">{c.tenure}</div>
              </div>
              <div className="mr-1.5 text-right">
                <div className="text-[19px] font-bold tracking-[-0.5px] text-[#064e3b]">
                  {c.pct}%
                </div>
                <div className="text-[11px] text-[#71807a]">complete</div>
              </div>
              <button
                type="button"
                onClick={() => run(() => deleteClient(c.id))}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[8px] border-none bg-transparent text-[18px] text-[#c64242] hover:bg-[#fdeaea]"
              >
                ×
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#71807a]">
                  Service
                </label>
                <input
                  defaultValue={c.service}
                  key={`svc-${c.id}-${c.service}`}
                  placeholder="Service"
                  onBlur={(e) =>
                    e.target.value !== c.service &&
                    run(() => editClient(c.id, "service", e.target.value))
                  }
                  className="mt-1.5 w-full rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#71807a]">
                  Login email
                </label>
                <input
                  defaultValue={c.email}
                  key={`em-${c.id}-${c.email}`}
                  placeholder="login@portal.tdl.com"
                  onBlur={(e) =>
                    e.target.value !== c.email &&
                    run(() => editClient(c.id, "email", e.target.value))
                  }
                  className="mt-1.5 w-full rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] text-[#0a7a5a] outline-none focus:border-[#064e3b]"
                />
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <div className="text-[11.5px] text-[#9aa3a0]">
                Password: <span className="font-mono text-[#71807a]">demo1234</span>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/cms/client/${c.id}`)}
                className="cursor-pointer border-none bg-transparent text-[12.5px] font-semibold text-[#064e3b] hover:underline"
              >
                Open dashboard →
              </button>
            </div>
          </div>
        ))}

        <AddClientCard disabled={pending} run={run} />
      </div>
    </div>
  );
}

function AddClientCard({
  disabled,
  run,
}: {
  disabled: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim()) return;
    setError(null);
    run(async () => {
      const res = await addClient(name, service, email);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setName("");
      setService("");
      setEmail("");
    });
  };

  return (
    <div className="rounded-[14px] border border-dashed border-[#cdd6d2] bg-white px-[22px] py-[18px]">
      <div className="mb-2.5 text-[13px] font-semibold">
        Create a new client login
      </div>
      <div className="flex flex-wrap gap-2">
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
          Add client
        </button>
      </div>
      {error && <div className="mt-2 text-[12px] text-[#c64242]">{error}</div>}
    </div>
  );
}
