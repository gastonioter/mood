"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntryType } from "@/utils/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Editor({ entry }: { entry: JournalEntryType }) {
  const [content, setContent] = useState("");
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const listener = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        setIsSaving(true);
        const en = await updateEntry({
          id: entry.id,
          content: ref?.current?.value as string,
        });
        setIsSaving(false);
        router.push("/journal");
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <textarea
      ref={ref}
      className={clsx("w-full h-full outline-none text-xl p-8 resize-none", {
        "text-gray-400": isSaving,
      })}
      defaultValue={entry.content}
      disabled={isSaving}
      name=""
      placeholder="Start typing something about your day..."
      id=""
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  );
}
