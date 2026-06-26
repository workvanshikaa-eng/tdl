"use client";

import { useState, useTransition } from "react";
import { changeMyPassword } from "@/app/cms/actions/account";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const submit = () => {
    setMsg(null);
    if (next !== confirm) {
      setMsg({ ok: false, text: "New passwords don't match" });
      return;
    }
    start(async () => {
      const res = await changeMyPassword(current, next);
      if (res.error) {
        setMsg({ ok: false, text: res.error });
        return;
      }
      setMsg({ ok: true, text: "Password updated." });
      setCurrent("");
      setNext("");
      setConfirm("");
    });
  };

  const input =
    "w-full rounded-[10px] border border-[#e0e5e3] px-[13px] py-[11px] font-[inherit] text-[13.5px] outline-none focus:border-[#064e3b]";

  return (
    <div className="max-w-[420px] rounded-[14px] border border-[#e6eae8] bg-white p-6">
      <div className="mb-1 text-[15px] font-semibold">Change password</div>
      <div className="mb-4 text-[12.5px] text-[#71807a]">
        Update the password you use to sign in.
      </div>

      <label className="text-[11.5px] font-semibold text-[#4a5752]">
        Current password
      </label>
      <input
        type="password"
        autoComplete="current-password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        className={`${input} mb-3 mt-1.5`}
      />

      <label className="text-[11.5px] font-semibold text-[#4a5752]">
        New password
      </label>
      <input
        type="password"
        autoComplete="new-password"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        className={`${input} mb-3 mt-1.5`}
      />

      <label className="text-[11.5px] font-semibold text-[#4a5752]">
        Confirm new password
      </label>
      <input
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className={`${input} mb-1 mt-1.5`}
      />

      {msg && (
        <div
          className="mt-2 text-[12px]"
          style={{ color: msg.ok ? "#0a7a4f" : "#c64242" }}
        >
          {msg.text}
        </div>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={pending || !current || !next}
        className="mt-4 w-full cursor-pointer rounded-[10px] border-none bg-[#064e3b] p-3 text-[14px] font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update password"}
      </button>
    </div>
  );
}
