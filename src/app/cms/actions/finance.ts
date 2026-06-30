"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/access";
import type { InvoiceItem } from "@/lib/money";

/** Create or update a client's money ledger row. Admin only. */
export async function upsertClientFinance(
  clientId: string,
  patch: {
    currency?: string;
    projected?: number;
    received?: number;
    startDate?: string | null;
    endDate?: string | null;
    notes?: string | null;
  },
) {
  await requireRole("admin");
  const data = {
    currency: patch.currency,
    projected:
      patch.projected == null || Number.isNaN(patch.projected)
        ? undefined
        : Math.max(0, patch.projected),
    received:
      patch.received == null || Number.isNaN(patch.received)
        ? undefined
        : Math.max(0, patch.received),
    startDate: patch.startDate,
    endDate: patch.endDate,
    notes: patch.notes,
  };
  await prisma.clientFinance.upsert({
    where: { clientId },
    create: {
      clientId,
      currency: data.currency ?? "USD",
      projected: data.projected ?? 0,
      received: data.received ?? 0,
      startDate: data.startDate ?? null,
      endDate: data.endDate ?? null,
      notes: data.notes ?? null,
    },
    update: data,
  });
  revalidatePath("/cms/finance");
}

function cleanItems(items: InvoiceItem[]): InvoiceItem[] {
  return (items || [])
    .map((i) => ({
      description: String(i.description ?? "").trim(),
      qty: Math.max(0, Number(i.qty) || 0),
      rate: Math.max(0, Number(i.rate) || 0),
    }))
    .filter((i) => i.description || i.qty || i.rate);
}

/** Create + store a new invoice. Admin only. Returns its id. */
export async function createInvoice(
  clientId: string,
  data: {
    issueDate: string;
    dueDate?: string;
    currency: string;
    items: InvoiceItem[];
    notes?: string;
    billToName?: string;
    billToEmail?: string;
    billToAddress?: string;
    billToTaxId?: string;
    discount?: number;
    taxLabel?: string;
    taxRate?: number;
    poNumber?: string;
    paymentTerms?: string;
  },
): Promise<{ id?: string; error?: string }> {
  await requireRole("admin");
  if (!clientId) return { error: "Pick a client" };
  const items = cleanItems(data.items);
  if (items.length === 0) return { error: "Add at least one line item" };

  const count = await prisma.invoice.count();
  const number = `INV-${String(count + 1).padStart(4, "0")}`;
  const billToAddress = data.billToAddress?.trim() || null;
  const billToTaxId = data.billToTaxId?.trim() || null;

  const inv = await prisma.invoice.create({
    data: {
      clientId,
      number,
      issueDate: data.issueDate || new Date().toISOString().slice(0, 10),
      dueDate: data.dueDate || null,
      currency: data.currency || "USD",
      items,
      notes: data.notes?.trim() || null,
      status: "Draft",
      billToName: data.billToName?.trim() || null,
      billToEmail: data.billToEmail?.trim() || null,
      billToAddress,
      billToTaxId,
      discount: Math.max(0, Number(data.discount) || 0),
      taxLabel: data.taxLabel?.trim() || "Tax",
      taxRate: Math.max(0, Number(data.taxRate) || 0),
      poNumber: data.poNumber?.trim() || null,
      paymentTerms: data.paymentTerms?.trim() || null,
    },
  });

  // Remember the bill-to address + GSTIN on the client for next time.
  if (billToAddress || billToTaxId) {
    await prisma.clientFinance.upsert({
      where: { clientId },
      create: { clientId, billingAddress: billToAddress, billingTaxId: billToTaxId },
      update: {
        ...(billToAddress ? { billingAddress: billToAddress } : {}),
        ...(billToTaxId ? { billingTaxId: billToTaxId } : {}),
      },
    });
  }

  revalidatePath("/cms/finance");
  return { id: inv.id };
}

export async function setInvoiceStatus(id: string, status: string) {
  await requireRole("admin");
  await prisma.invoice.update({ where: { id }, data: { status } });
  revalidatePath("/cms/finance");
}

export async function deleteInvoice(id: string) {
  await requireRole("admin");
  await prisma.invoice.delete({ where: { id } }).catch(() => {});
  revalidatePath("/cms/finance");
}
