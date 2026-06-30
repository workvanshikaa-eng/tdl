-- Client GSTIN on invoices + remembered per client
ALTER TABLE "ClientFinance" ADD COLUMN "billingTaxId" TEXT;
ALTER TABLE "Invoice" ADD COLUMN "billToTaxId" TEXT;
