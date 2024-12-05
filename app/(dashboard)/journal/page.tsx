import { getEntries } from "@/data/journalEntry";
import JournalEntry from "./components/JournalEntry";
import NewEntrCard from "./components/NewEntryCard";
import { JournalEntryType } from "@/utils/types";
import Question from "./components/Question";

export default async function Page() {
  const entries = (await getEntries()) as Array<JournalEntryType>;

  return (
    <div className="p-10 bg-zinc-300/10">
      <h2 className="text-3xl mb-8">Journal</h2>

      <Question />

      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NewEntrCard />

        {entries.map((entry) => (
          <JournalEntry entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
}
