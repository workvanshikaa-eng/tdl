-- Business expenses for net-profit tracking
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Other',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "date" TEXT NOT NULL,
    "recurring" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Expense_date_idx" ON "Expense"("date");
