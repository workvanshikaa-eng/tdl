-- Admin-only client finance ledger + stored invoices
CREATE TABLE "ClientFinance" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "projected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "received" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TEXT,
    "endDate" TEXT,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClientFinance_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ClientFinance_clientId_key" ON "ClientFinance"("clientId");
ALTER TABLE "ClientFinance" ADD CONSTRAINT "ClientFinance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "issueDate" TEXT NOT NULL,
    "dueDate" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "items" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Invoice_clientId_idx" ON "Invoice"("clientId");
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
