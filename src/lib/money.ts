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
