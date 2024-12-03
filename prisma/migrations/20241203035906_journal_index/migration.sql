-- DropIndex
DROP INDEX "JournalEntry_userId_id_idx";

-- CreateIndex
CREATE INDEX "JournalEntry_id_userId_idx" ON "JournalEntry"("id", "userId");
