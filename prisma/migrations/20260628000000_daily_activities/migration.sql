-- Daily recurring activities + per-day logs
CREATE TABLE "DailyActivity" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,
    "dailyTarget" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "DailyActivity_clientId_idx" ON "DailyActivity"("clientId");
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "DailyLog_activityId_date_key" ON "DailyLog"("activityId", "date");
CREATE INDEX "DailyLog_activityId_idx" ON "DailyLog"("activityId");
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "DailyActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
