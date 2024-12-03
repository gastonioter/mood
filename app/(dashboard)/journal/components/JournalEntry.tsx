import { JournalEntryType } from "@/utils/types";
import Link from "next/link";

export default function JournalEntry({ entry }: { entry: JournalEntryType }) {
  const { content, createdAt, id } = entry;
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Link href={`/journal/${id}`}>
      <div className=" divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">{date}</div>
        <div className="px-4 py-5 sm:p-6">summary</div>
        <div className="px-4 py-4 sm:px-6">mood</div>
      </div>
    </Link>
  );
}
