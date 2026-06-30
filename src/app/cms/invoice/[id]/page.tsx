import { notFound } from "next/navigation";
import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { formatMoney, invoiceTotals, type InvoiceItem } from "@/lib/money";
import TdlLogo from "@/components/TdlLogo";
import PrintButton from "@/components/cms/PrintButton";

export const preferredRegion = "sin1";
export const metadata = { title: "Invoice" };

export default async function InvoicePrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireRole("admin");

  const inv = await prisma.invoice.findUnique({
    where: { id },
    include: { client: { include: { portalUser: { select: { email: true } } } } },
  });
  if (!inv) notFound();

  const items = (inv.items as unknown as InvoiceItem[]) ?? [];
  const t = invoiceTotals(items, inv.discount, inv.taxRate);
  const from = siteConfig.invoiceFrom;
  const cur = inv.currency;
  const billName = inv.billToName || inv.client.name;
  const billEmail = inv.billToEmail || inv.client.portalUser?.email || "";

  return (
    <div style={{ background: "#f4f6f5", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}>
      <style>{`@media print { .no-print { display:none !important; } body { background:#fff !important; } .invoice-sheet { box-shadow:none !important; margin:0 !important; } }`}</style>

      <div className="no-print" style={{ maxWidth: 820, margin: "0 auto", padding: "18px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <a href="/cms/finance" style={{ fontSize: 13, fontWeight: 600, color: "#064e3b", textDecoration: "none" }}>
          ← Back to Finance
        </a>
        <PrintButton />
      </div>

      <div
        className="invoice-sheet"
        style={{
          maxWidth: 820,
          margin: "20px auto 60px",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 10px 40px rgba(6,78,59,0.10)",
          padding: "48px 52px",
          color: "#0f1f1a",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <TdlLogo size={44} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>
                {from.companyName}
              </div>
              <div style={{ fontSize: 12.5, color: "#71807a" }}>{from.email}</div>
              {from.phone && <div style={{ fontSize: 12.5, color: "#71807a" }}>{from.phone}</div>}
              {from.website && <div style={{ fontSize: 12.5, color: "#71807a" }}>{from.website}</div>}
              {from.address && <div style={{ fontSize: 12.5, color: "#71807a", whiteSpace: "pre-line" }}>{from.address}</div>}
              {from.taxId && <div style={{ fontSize: 12.5, color: "#71807a" }}>{from.taxId}</div>}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", color: "#064e3b" }}>
              INVOICE
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#4a5752", marginTop: 2 }}>
              {inv.number}
            </div>
            <div style={{ display: "inline-block", marginTop: 8, fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "#ecf3f0", color: "#064e3b" }}>
              {inv.status}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginTop: 36 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#9aa3a0" }}>
              Bill to
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{billName}</div>
            {billEmail && (
              <div style={{ fontSize: 12.5, color: "#71807a" }}>{billEmail}</div>
            )}
            {inv.billToAddress && (
              <div style={{ fontSize: 12.5, color: "#71807a", whiteSpace: "pre-line", marginTop: 2 }}>
                {inv.billToAddress}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", fontSize: 12.5, color: "#4a5752" }}>
            <div>
              <span style={{ color: "#9aa3a0" }}>Issued:</span> {inv.issueDate}
            </div>
            {inv.dueDate && (
              <div>
                <span style={{ color: "#9aa3a0" }}>Due:</span> {inv.dueDate}
              </div>
            )}
            {inv.poNumber && (
              <div>
                <span style={{ color: "#9aa3a0" }}>PO:</span> {inv.poNumber}
              </div>
            )}
            {inv.paymentTerms && (
              <div>
                <span style={{ color: "#9aa3a0" }}>Terms:</span> {inv.paymentTerms}
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 28 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #064e3b" }}>
              <th style={{ textAlign: "left", padding: "8px 6px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", color: "#71807a" }}>Description</th>
              <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", color: "#71807a", width: 70 }}>Qty</th>
              <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", color: "#71807a", width: 110 }}>Rate</th>
              <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.4px", color: "#71807a", width: 120 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eef2f0" }}>
                <td style={{ padding: "11px 6px", fontSize: 13.5 }}>{it.description}</td>
                <td style={{ padding: "11px 6px", fontSize: 13, textAlign: "right" }}>{it.qty}</td>
                <td style={{ padding: "11px 6px", fontSize: 13, textAlign: "right" }}>{formatMoney(it.rate, cur)}</td>
                <td style={{ padding: "11px 6px", fontSize: 13, textAlign: "right", fontWeight: 600 }}>{formatMoney(it.qty * it.rate, cur)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals breakdown */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
          <div style={{ width: 300 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 6px", fontSize: 13 }}>
              <span style={{ color: "#71807a" }}>Subtotal</span>
              <span>{formatMoney(t.subtotal, cur)}</span>
            </div>
            {t.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 6px", fontSize: 13 }}>
                <span style={{ color: "#71807a" }}>Discount</span>
                <span>−{formatMoney(t.discount, cur)}</span>
              </div>
            )}
            {inv.taxRate > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 6px", fontSize: 13 }}>
                <span style={{ color: "#71807a" }}>
                  {inv.taxLabel} ({inv.taxRate}%)
                </span>
                <span>{formatMoney(t.taxAmount, cur)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 6px", borderTop: "2px solid #064e3b", marginTop: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#064e3b" }}>{formatMoney(t.total, cur)}</span>
            </div>
          </div>
        </div>

        {from.paymentInstructions && (
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #eef2f0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#9aa3a0" }}>
              Payment details
            </div>
            <div style={{ fontSize: 13, color: "#4a5752", marginTop: 5, lineHeight: 1.5, whiteSpace: "pre-line" }}>
              {from.paymentInstructions}
            </div>
          </div>
        )}

        {inv.notes && (
          <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid #eef2f0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#9aa3a0" }}>
              Notes
            </div>
            <div style={{ fontSize: 13, color: "#4a5752", marginTop: 5, lineHeight: 1.5 }}>{inv.notes}</div>
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 11.5, color: "#9aa3a0" }}>
          Thank you — {from.companyName}
        </div>
      </div>
    </div>
  );
}
