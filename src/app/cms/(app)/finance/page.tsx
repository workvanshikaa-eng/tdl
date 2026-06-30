import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { invoiceTotals, type InvoiceItem } from "@/lib/money";
import FinanceSheet from "@/components/cms/FinanceSheet";
import { siteConfig } from "@/config/site";

export default async function FinancePage() {
  await requireRole("admin");

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "asc" },
    include: { finance: true, portalUser: { select: { email: true } } },
  });

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: { select: { name: true } } },
  });

  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });

  const ledger = clients.map((c) => ({
    clientId: c.id,
    clientName: c.name,
    currency: c.finance?.currency ?? siteConfig.invoiceFrom.defaultCurrency,
    projected: c.finance?.projected ?? 0,
    received: c.finance?.received ?? 0,
    startDate: c.finance?.startDate ?? "",
    endDate: c.finance?.endDate ?? "",
    notes: c.finance?.notes ?? "",
  }));

  const invoiceRows = invoices.map((i) => ({
    id: i.id,
    number: i.number,
    clientName: i.client.name,
    issueDate: i.issueDate,
    status: i.status,
    currency: i.currency,
    total: invoiceTotals(
      (i.items as unknown as InvoiceItem[]) ?? [],
      i.discount,
      i.taxRate,
    ).total,
  }));

  return (
    <FinanceSheet
      ledger={ledger}
      invoices={invoiceRows}
      expenses={expenses.map((e) => ({
        id: e.id,
        label: e.label,
        category: e.category,
        amount: e.amount,
        currency: e.currency,
        date: e.date,
        recurring: e.recurring,
      }))}
      clientOptions={clients.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.portalUser?.email ?? "",
        billingAddress: c.finance?.billingAddress ?? "",
        billingTaxId: c.finance?.billingTaxId ?? "",
      }))}
      defaultCurrency={siteConfig.invoiceFrom.defaultCurrency}
    />
  );
}
