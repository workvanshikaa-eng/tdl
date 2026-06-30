-- Richer invoice fields + remembered billing address
ALTER TABLE "ClientFinance" ADD COLUMN "billingAddress" TEXT;

ALTER TABLE "Invoice" ADD COLUMN "billToName" TEXT;
ALTER TABLE "Invoice" ADD COLUMN "billToEmail" TEXT;
ALTER TABLE "Invoice" ADD COLUMN "billToAddress" TEXT;
ALTER TABLE "Invoice" ADD COLUMN "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "Invoice" ADD COLUMN "taxLabel" TEXT NOT NULL DEFAULT 'Tax';
ALTER TABLE "Invoice" ADD COLUMN "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "Invoice" ADD COLUMN "poNumber" TEXT;
ALTER TABLE "Invoice" ADD COLUMN "paymentTerms" TEXT;
