"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addClient,
  editClient,
  deleteClient,
  resetClientPassword,
} from "@/app/cms/actions/clients";
import { randomPassword } from "@/lib/password";

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
  const [revealed, setRevealed] = useState<Record<string, string>>({});
  const router = useRouter();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  const reset = (clientId: string) =>
    start(async () => {
      const res = await resetClientPassword(clientId);
      if (res.password)
        setRevealed((r) => ({ ...r, [clientId]: res.password! }));
    });

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
                <input
                  defaultValue={c.name}
                  key={`nm-${c.id}-${c.name}`}
                  onBlur={(e) =>
                    e.target.value.trim() &&
                    e.target.value !== c.name &&
                    run(() => editClient(c.id, "name", e.target.value))
                  }
                  className="w-full max-w-[280px] rounded-[6px] border border-transparent bg-transparent px-1 py-0.5 font-[inherit] text-[15px] font-semibold outline-none hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white"
                />
                <div className="px-1 text-[12px] text-[#71807a]">{c.tenure}</div>
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

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11.5px]">
                <button
                  type="button"
                  onClick={() => reset(c.id)}
                  disabled={pending}
                  className="cursor-pointer rounded-[7px] border border-[#e0e5e3] bg-white px-2.5 py-1.5 font-semibold text-[#4a5752] disabled:opacity-60 hover:border-[#cdd6d2]"
                >
                  Reset password
                </button>
                {revealed[c.id] && (
                  <span className="text-[#71807a]">
                    New password:{" "}
                    <span className="select-all font-mono text-[#0a7a4f]">
                      {revealed[c.id]}
                    </span>{" "}
                    — share with the client
                  </span>
                )}
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ email: string; password: string } | null>(
    null,
  );

  // Generate an initial password on the client (avoids hydration mismatch).
  useEffect(() => setPassword(randomPassword()), []);

  const submit = () => {
    if (!name.trim()) return;
    setError(null);
    setCreated(null);
    const usedEmail =
      email.trim().toLowerCase() ||
      `${name.trim().toLowerCase().split(/\s+/)[0]}@portal.tdl.com`;
    const usedPassword = password;
    run(async () => {
      const res = await addClient(name, service, email, password);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setCreated({ email: usedEmail, password: usedPassword });
      setName("");
      setService("");
      setEmail("");
      setPassword(randomPassword());
    });
  };

  const field =
    "min-w-[150px] flex-1 rounded-[9px] border border-[#e0e5e3] px-[11px] py-[9px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]";

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
          className={field}
        />
        <input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service (e.g. SEO Retainer)"
          className={field}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Login email"
          className={field}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`${field} font-mono`}
        />
        <button
          type="button"
          onClick={() => setPassword(randomPassword())}
          className="cursor-pointer whitespace-nowrap rounded-[9px] border border-[#e0e5e3] bg-white px-3 py-[9px] text-[12.5px] font-semibold text-[#4a5752] hover:border-[#cdd6d2]"
        >
          ↻ Generate
        </button>
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
      {created && (
        <div className="mt-2.5 rounded-[9px] border border-[#cfe7da] bg-[#f1f9f5] px-3 py-2 text-[12px] text-[#0a5e47]">
          ✓ Client created. Share these login details:
          <div className="mt-1 font-mono text-[12px] text-[#0a7a4f]">
            {created.email} &nbsp;·&nbsp; {created.password}
          </div>
        </div>
      )}
    </div>
  );
}
