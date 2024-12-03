"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation"; // Cambio aquí

export default function NewEntryCard() {
  // Eliminamos `async`
  const router = useRouter();

  async function handleNewEntry() {
    try {
      const data = await createNewEntry(); // Esperamos la creación de la entrada
      router.push(`/journal/${data.id}`); // Navegamos a la nueva entrada
    } catch (error) {
      console.error("Error creating new entry:", error);
    }
  }

  return (
    <div
      onClick={handleNewEntry}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-5 py-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}
