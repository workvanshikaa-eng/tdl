"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";
import TdlLogo from "@/components/TdlLogo";

export type DemoAccount = { email: string; tag: string };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full cursor-pointer rounded-[10px] border-none bg-[#064e3b] p-3 text-center text-[14px] font-semibold text-white disabled:opacity-70"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({
  demoAccounts,
}: {
  demoAccounts: DemoAccount[];
}) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {
    error: null,
  });
  const [showDemo, setShowDemo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillDemo = (e: string) => {
    setEmail(e);
    setPassword("demo1234");
  };

  return (
    <div
      className="relative w-[392px] rounded-[18px] bg-white p-[34px]"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.28)" }}
    >
      <div className="mb-[22px] flex items-center gap-3">
        <TdlLogo size={40} radius={0.27} />
        <div>
          <div className="text-[16px] font-bold tracking-[-0.3px]">
            The Distribution Lab
          </div>
          <div className="text-[12px] text-[#71807a]">Sign in to your portal</div>
        </div>
      </div>

      <form action={formAction}>
        <label className="text-[11.5px] font-semibold text-[#4a5752]">
          Email
        </label>
        <input
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mb-3.5 mt-1.5 w-full rounded-[10px] border border-[#e0e5e3] px-[13px] py-[11px] font-[inherit] text-[13.5px] outline-none focus:border-[#064e3b]"
        />

        <label className="text-[11.5px] font-semibold text-[#4a5752]">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mb-1.5 mt-1.5 w-full rounded-[10px] border border-[#e0e5e3] px-[13px] py-[11px] font-[inherit] text-[13.5px] outline-none focus:border-[#064e3b]"
        />

        {state.error && (
          <div className="mt-1 text-[12px] text-[#c64242]">{state.error}</div>
        )}

        <SubmitButton />
      </form>

      {demoAccounts.length > 0 && (
        <div
          onClick={() => setShowDemo((v) => !v)}
          className="mt-4 cursor-pointer text-center text-[11.5px] text-[#71807a]"
        >
          {showDemo ? "Hide demo logins" : "View demo logins"}
        </div>
      )}

      {showDemo && demoAccounts.length > 0 && (
        <div className="mt-2.5 rounded-[10px] border border-[#eef2f0] bg-[#f8faf9] px-[13px] py-3">
          <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.4px] text-[#9aa3a0]">
            Demo logins · password: demo1234
          </div>
          <div className="flex flex-col gap-1.5">
            {demoAccounts.map((a) => (
              <div
                key={a.email}
                onClick={() => fillDemo(a.email)}
                className="flex cursor-pointer justify-between gap-2.5 text-[11.5px] hover:text-[#064e3b]"
              >
                <span className="text-[#4a5752]">{a.email}</span>
                <span className="text-[#9aa3a0]">{a.tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
