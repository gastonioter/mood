-- DropIndex
DROP INDEX "JournalEntry_userId_idx";

-- CreateIndex
CREATE INDEX "JournalEntry_userId_id_idx" ON "JournalEntry"("userId", "id");
