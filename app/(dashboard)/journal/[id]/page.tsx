import { getEntryById } from "@/data/journalEntry";
import Editor from "../components/Editor";
import { notFound } from "next/navigation";
import { JournalEntryType } from "@/utils/types";

type Params = Promise<{
  id: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const entry = await getEntryById(id);

  if (!entry) {
    notFound();
  }

  return <Editor entry={entry as JournalEntryType} />;
}
