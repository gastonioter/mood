import { getEntryById } from "@/data/journalEntry";
import Editor from "../components/Editor";
import { notFound } from "next/navigation";
import Analisis from "../components/Analisis";

type Params = Promise<{
  id: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const entry = await getEntryById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="p-3  h-full">
      <Editor entry={entry} />
    </div>
  );
}
