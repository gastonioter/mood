"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NewEntryCard() {
  const router = useRouter();

  async function handleNewEntry() {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  }

  return (
    <div
      onClick={handleNewEntry}
      
      className="cursor-pointer overflow-hidden rounded-lg  bg-white shadow"
    >
      <div className="px-5 py-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}
