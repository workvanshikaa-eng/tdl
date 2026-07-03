-- Add optional quantitative progress to deliverables
ALTER TABLE "Deliverable" ADD COLUMN "unit" TEXT;
ALTER TABLE "Deliverable" ADD COLUMN "targetCount" INTEGER;
ALTER TABLE "Deliverable" ADD COLUMN "doneCount" INTEGER;
