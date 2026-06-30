"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  upsertClientFinance,
  createInvoice,
  setInvoiceStatus,
  deleteInvoice,
} from "@/app/cms/actions/finance";
import {
  CURRENCIES,
  formatMoney,
  invoiceTotals,
  type InvoiceItem,
} from "@/lib/money";

type LedgerRow = {
  clientId: string;
  clientName: string;
  currency: string;
  projected: number;
  received: number;
  startDate: string;
  endDate: string;
  notes: string;
};
type InvoiceRow = {
  id: string;
  number: string;
  clientName: string;
  issueDate: string;
  status: string;
  currency: string;
  total: number;
};

const STATUSES = ["Draft", "Sent", "Paid"];

export default function FinanceSheet({
  ledger,
  invoices,
  clientOptions,
  defaultCurrency,
}: {
  ledger: LedgerRow[];
  invoices: InvoiceRow[];
  clientOptions: { id: string; name: string; email: string; billingAddress: string; billingTaxId: string }[];
  defaultCurrency: string;
}) {
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<unknown>) => start(() => void fn());

  // Totals grouped by currency (don't sum across currencies).
  const totals = useMemo(() => {
    const m = new Map<string, { projected: number; received: number }>();
    for (const r of ledger) {
      const t = m.get(r.currency) ?? { projected: 0, received: 0 };
      t.projected += r.projected;
      t.received += r.received;
      m.set(r.currency, t);
    }
    return [...m.entries()];
  }, [ledger]);

  const input =
    "w-full rounded-[7px] border border-transparent bg-transparent px-2 py-1 font-[inherit] text-[12.5px] outline-none hover:border-[#e0e5e3] focus:border-[#064e3b] focus:bg-white";

  return (
    <div>
      <div className="mb-4 text-[12.5px] text-[#71807a]">
        Your private money tracker — projected value, what&apos;s come in,
        what&apos;s left, and generated invoices. Only you (admin) can see this.
      </div>

      {/* Totals */}
      <div className="mb-5 flex flex-wrap gap-3">
        {totals.length === 0 && (
          <div className="text-[12.5px] text-[#9aa3a0]">
            Add projected amounts below to see totals.
          </div>
        )}
        {totals.map(([cur, t]) => (
          <div
            key={cur}
            className="rounded-[12px] border border-[#e6eae8] bg-white px-4 py-3"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
              {cur}
            </div>
            <div className="mt-1 flex gap-4 text-[13px]">
              <span>
                Projected{" "}
                <b className="text-[#064e3b]">{formatMoney(t.projected, cur)}</b>
              </span>
              <span>
                Received{" "}
                <b className="text-[#0a7a4f]">{formatMoney(t.received, cur)}</b>
              </span>
              <span>
                Outstanding{" "}
                <b className="text-[#b27400]">
                  {formatMoney(t.projected - t.received, cur)}
                </b>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Ledger */}
      <div className="mb-2 text-[15px] font-semibold">Client ledger</div>
      <div className="mb-7 overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr_1.4fr] gap-2 border-b border-[#e6eae8] bg-[#f8faf9] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
              <div>Client</div>
              <div>Projected</div>
              <div>Received</div>
              <div>Left</div>
              <div>Start</div>
              <div>End</div>
              <div>Cur · Notes</div>
            </div>
            {ledger.map((r) => (
              <div
                key={r.clientId}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr_1.4fr] items-center gap-2 border-b border-[#eef2f0] px-4 py-2 last:border-b-0"
              >
                <div className="text-[13px] font-semibold">{r.clientName}</div>
                <input
                  type="number"
                  min={0}
                  defaultValue={r.projected || ""}
                  key={`p-${r.clientId}-${r.projected}`}
                  placeholder="0"
                  onBlur={(e) =>
                    Number(e.target.value) !== r.projected &&
                    run(() =>
                      upsertClientFinance(r.clientId, {
                        projected: Number(e.target.value),
                      }),
                    )
                  }
                  className={input}
                />
                <input
                  type="number"
                  min={0}
                  defaultValue={r.received || ""}
                  key={`r-${r.clientId}-${r.received}`}
                  placeholder="0"
                  onBlur={(e) =>
                    Number(e.target.value) !== r.received &&
                    run(() =>
                      upsertClientFinance(r.clientId, {
                        received: Number(e.target.value),
                      }),
                    )
                  }
                  className={input}
                />
                <div className="px-2 text-[12.5px] font-semibold text-[#b27400]">
                  {formatMoney(r.projected - r.received, r.currency)}
                </div>
                <input
                  type="date"
                  defaultValue={r.startDate}
                  key={`s-${r.clientId}-${r.startDate}`}
                  onBlur={(e) =>
                    e.target.value !== r.startDate &&
                    run(() =>
                      upsertClientFinance(r.clientId, {
                        startDate: e.target.value || null,
                      }),
                    )
                  }
                  className={input}
                />
                <input
                  type="date"
                  defaultValue={r.endDate}
                  key={`e-${r.clientId}-${r.endDate}`}
                  onBlur={(e) =>
                    e.target.value !== r.endDate &&
                    run(() =>
                      upsertClientFinance(r.clientId, {
                        endDate: e.target.value || null,
                      }),
                    )
                  }
                  className={input}
                />
                <div className="flex items-center gap-1">
                  <select
                    defaultValue={r.currency}
                    onChange={(e) =>
                      run(() =>
                        upsertClientFinance(r.clientId, {
                          currency: e.target.value,
                        }),
                      )
                    }
                    className="rounded-[7px] border border-[#e0e5e3] bg-white px-1 py-1 text-[12px] outline-none"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    defaultValue={r.notes}
                    key={`n-${r.clientId}-${r.notes}`}
                    placeholder="notes"
                    onBlur={(e) =>
                      e.target.value !== r.notes &&
                      run(() =>
                        upsertClientFinance(r.clientId, {
                          notes: e.target.value || null,
                        }),
                      )
                    }
                    className={input}
                  />
                </div>
              </div>
            ))}
            {ledger.length === 0 && (
              <div className="px-4 py-6 text-[12.5px] text-[#9aa3a0]">
                No clients yet — add clients in Clients &amp; Access first.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoices */}
      <Invoices
        invoices={invoices}
        clientOptions={clientOptions}
        defaultCurrency={defaultCurrency}
        pending={pending}
        run={run}
      />
    </div>
  );
}

function Invoices({
  invoices,
  clientOptions,
  defaultCurrency,
  pending,
  run,
}: {
  invoices: InvoiceRow[];
  clientOptions: { id: string; name: string; email: string; billingAddress: string; billingTaxId: string }[];
  defaultCurrency: string;
  pending: boolean;
  run: (fn: () => Promise<unknown>) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[15px] font-semibold">Invoices</div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer rounded-[9px] border-none bg-[#064e3b] px-[15px] py-2 text-[12.5px] font-semibold text-white"
        >
          {open ? "Close" : "＋ New invoice"}
        </button>
      </div>

      {open && (
        <NewInvoiceForm
          clientOptions={clientOptions}
          defaultCurrency={defaultCurrency}
          pending={pending}
          run={run}
          onDone={() => setOpen(false)}
        />
      )}

      <div className="mt-3 overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
        <div className="grid grid-cols-[1fr_1.4fr_1fr_1fr_1fr_1.2fr] gap-2 border-b border-[#e6eae8] bg-[#f8faf9] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
          <div>Invoice</div>
          <div>Client</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>
        {invoices.length === 0 && (
          <div className="px-4 py-6 text-[12.5px] text-[#9aa3a0]">
            No invoices yet. Click “New invoice” to generate one.
          </div>
        )}
        {invoices.map((i) => (
          <div
            key={i.id}
            className="grid grid-cols-[1fr_1.4fr_1fr_1fr_1fr_1.2fr] items-center gap-2 border-b border-[#eef2f0] px-4 py-2.5 last:border-b-0"
          >
            <div className="font-mono text-[12.5px] font-semibold text-[#064e3b]">
              {i.number}
            </div>
            <div className="text-[13px]">{i.clientName}</div>
            <div className="text-[12.5px] text-[#71807a]">{i.issueDate}</div>
            <div className="text-[12.5px] font-semibold">
              {formatMoney(i.total, i.currency)}
            </div>
            <select
              defaultValue={i.status}
              onChange={(e) => run(() => setInvoiceStatus(i.id, e.target.value))}
              className="rounded-[7px] border border-[#e0e5e3] bg-white px-2 py-1 text-[12px] outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-end gap-3">
              <a
                href={`/cms/invoice/${i.id}`}
                target="_blank"
                rel="noopener"
                className="text-[12.5px] font-semibold text-[#064e3b] no-underline hover:underline"
              >
                PDF ↗
              </a>
              <button
                type="button"
                onClick={() => run(() => deleteInvoice(i.id))}
                className="cursor-pointer border-none bg-transparent text-[16px] text-[#c64242]"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewInvoiceForm({
  clientOptions,
  defaultCurrency,
  pending,
  run,
  onDone,
}: {
  clientOptions: { id: string; name: string; email: string; billingAddress: string; billingTaxId: string }[];
  defaultCurrency: string;
  pending: boolean;
  run: (fn: () => Promise<unknown>) => void;
  onDone: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [clientId, setClientId] = useState(clientOptions[0]?.id ?? "");
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState(defaultCurrency);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", qty: 1, rate: 0 },
  ]);
  // Bill-to + extra fields
  const [billToName, setBillToName] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billToTaxId, setBillToTaxId] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [discount, setDiscount] = useState(0);
  const [taxLabel, setTaxLabel] = useState("GST");
  const [taxRate, setTaxRate] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill bill-to from the selected client.
  useEffect(() => {
    const c = clientOptions.find((o) => o.id === clientId);
    setBillToName(c?.name ?? "");
    setBillToEmail(c?.email ?? "");
    setBillToAddress(c?.billingAddress ?? "");
    setBillToTaxId(c?.billingTaxId ?? "");
  }, [clientId, clientOptions]);

  const t = invoiceTotals(items, discount, taxRate);

  const setItem = (idx: number, patch: Partial<InvoiceItem>) =>
    setItems((arr) => arr.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const submit = () => {
    setError(null);
    run(async () => {
      const res = await createInvoice(clientId, {
        issueDate,
        dueDate,
        currency,
        items,
        notes,
        billToName,
        billToEmail,
        billToAddress,
        billToTaxId,
        discount,
        taxLabel,
        taxRate,
        poNumber,
        paymentTerms,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }
      onDone();
      if (res.id) window.open(`/cms/invoice/${res.id}`, "_blank");
    });
  };

  const field =
    "rounded-[8px] border border-[#e0e5e3] px-[10px] py-[8px] font-[inherit] text-[12.5px] outline-none focus:border-[#064e3b]";

  return (
    <div className="rounded-[13px] border border-[#cdd6d2] bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className={`${field} min-w-[170px] flex-1 bg-white`}
        >
          {clientOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1 text-[11px] text-[#71807a]">
          Issue
          <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={field} />
        </label>
        <label className="flex items-center gap-1 text-[11px] text-[#71807a]">
          Due
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={field} />
        </label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`${field} bg-white`}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Bill to */}
      <div className="mb-1 mt-3 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
        Invoice to
      </div>
      <div className="grid grid-cols-2 gap-2 max-[700px]:grid-cols-1">
        <input value={billToName} onChange={(e) => setBillToName(e.target.value)} placeholder="Full registered company name" className={field} />
        <input value={billToEmail} onChange={(e) => setBillToEmail(e.target.value)} placeholder="Email" className={field} />
      </div>
      <textarea
        value={billToAddress}
        onChange={(e) => setBillToAddress(e.target.value)}
        placeholder="Registered address (remembered for next time)"
        rows={2}
        className={`${field} mt-2 w-full resize-y`}
      />
      <input
        value={billToTaxId}
        onChange={(e) => setBillToTaxId(e.target.value)}
        placeholder="Client GSTIN (if applicable)"
        className={`${field} mt-2 w-full`}
      />
      <div className="mt-2 grid grid-cols-2 gap-2 max-[700px]:grid-cols-1">
        <input value={poNumber} onChange={(e) => setPoNumber(e.target.value)} placeholder="PO / reference (optional)" className={field} />
        <input value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} placeholder="Payment terms (e.g. Net 15)" className={field} />
      </div>

      <div className="mt-3 overflow-hidden rounded-[9px] border border-[#eef2f0]">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_28px] gap-2 bg-[#f8faf9] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
          <div>Description</div>
          <div>Qty</div>
          <div>Rate</div>
          <div>Amount</div>
          <div />
        </div>
        {items.map((it, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[3fr_1fr_1fr_1fr_28px] items-center gap-2 border-t border-[#eef2f0] px-3 py-2"
          >
            <input
              value={it.description}
              onChange={(e) => setItem(idx, { description: e.target.value })}
              placeholder="e.g. LinkedIn Lead Gen — June"
              className={field}
            />
            <input
              type="number"
              min={0}
              value={it.qty}
              onChange={(e) => setItem(idx, { qty: Number(e.target.value) })}
              className={field}
            />
            <input
              type="number"
              min={0}
              value={it.rate}
              onChange={(e) => setItem(idx, { rate: Number(e.target.value) })}
              className={field}
            />
            <div className="text-[12.5px] font-semibold">
              {formatMoney(it.qty * it.rate, currency)}
            </div>
            <button
              type="button"
              onClick={() => setItems((a) => a.filter((_, i) => i !== idx))}
              className="cursor-pointer border-none bg-transparent text-[15px] text-[#c64242]"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setItems((a) => [...a, { description: "", qty: 1, rate: 0 }])}
          className="w-full cursor-pointer border-none border-t border-[#eef2f0] bg-white py-2 text-[12px] font-semibold text-[#064e3b]"
        >
          ＋ Add line
        </button>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_300px] gap-4 max-[760px]:grid-cols-1">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes shown on the invoice (optional)"
          rows={4}
          className={`${field} w-full resize-y`}
        />
        <div className="rounded-[10px] border border-[#eef2f0] bg-[#f8faf9] p-3">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="text-[#71807a]">Subtotal</span>
            <span className="font-semibold">{formatMoney(t.subtotal, currency)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[12.5px] text-[#71807a]">Discount</span>
            <input
              type="number"
              min={0}
              value={discount || ""}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="0"
              className={`${field} w-[110px] text-right`}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-[12.5px] text-[#71807a]">
              <input
                value={taxLabel}
                onChange={(e) => setTaxLabel(e.target.value)}
                className={`${field} w-[58px] px-1.5 py-1`}
              />
              <input
                type="number"
                min={0}
                value={taxRate || ""}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                placeholder="0"
                className={`${field} w-[52px] px-1.5 py-1 text-right`}
              />
              %
            </span>
            <span className="text-[12.5px] font-semibold">
              {formatMoney(t.taxAmount, currency)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[#dde3e0] pt-2">
            <span className="text-[13px] font-bold">Total</span>
            <span className="text-[16px] font-extrabold text-[#064e3b]">
              {formatMoney(t.total, currency)}
            </span>
          </div>
        </div>
      </div>

      {error && <div className="mt-2 text-[12px] text-[#c64242]">{error}</div>}

      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="mt-3 cursor-pointer rounded-[9px] border-none bg-[#064e3b] px-[18px] py-[10px] text-[13px] font-semibold text-white disabled:opacity-60"
      >
        Create invoice &amp; open PDF
      </button>
    </div>
  );
}
