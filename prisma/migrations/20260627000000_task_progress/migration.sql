-- Add optional quantitative progress to tasks
ALTER TABLE "Task" ADD COLUMN "unit" TEXT;
ALTER TABLE "Task" ADD COLUMN "targetCount" INTEGER;
ALTER TABLE "Task" ADD COLUMN "doneCount" INTEGER;
