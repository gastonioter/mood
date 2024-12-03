import { getEntries } from "@/data/journalEntry";
import JournalEntry from "./components/JournalEntry";
import NewEntrCard from "./components/NewEntryCard";
import { analize } from "@/utils/ai";

export default async function Page() {
  const entries = await getEntries();
  await analize(
    "hoy fue un dia muy malo y no me siento bien",
  );

  return (
    <div className="p-10 bg-zinc-300/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntrCard />

        {entries.map((entry) => (
          <JournalEntry entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
}
