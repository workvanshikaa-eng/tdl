export type InvoiceItem = { description: string; qty: number; rate: number };

export const CURRENCIES = ["USD", "INR", "EUR", "GBP", "AED", "SGD", "AUD", "CAD"] as const;

const SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
  SGD: "S$",
  AUD: "A$",
  CAD: "C$",
};

export function currencySymbol(code: string): string {
  return SYMBOLS[code] ?? code + " ";
}

export function formatMoney(amount: number, currency: string): string {
  const n = (amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${currencySymbol(currency)}${n}`;
}

export function invoiceTotal(items: InvoiceItem[]): number {
  return items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0);
}

/** Full breakdown: subtotal → less discount → plus tax = grand total. */
export function invoiceTotals(
  items: InvoiceItem[],
  discount = 0,
  taxRate = 0,
): { subtotal: number; discount: number; taxable: number; taxAmount: number; total: number } {
  const subtotal = invoiceTotal(items);
  const disc = Math.min(Math.max(0, Number(discount) || 0), subtotal);
  const taxable = subtotal - disc;
  const taxAmount = taxable * ((Number(taxRate) || 0) / 100);
  return {
    subtotal,
    discount: disc,
    taxable,
    taxAmount,
    total: taxable + taxAmount,
  };
}
