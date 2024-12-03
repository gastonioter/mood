"use client";

import { JournalEntryType } from "@/utils/types";
import { useState } from "react";

export default function Editor({ entry }: { entry: JournalEntryType }) {
  const [content, setContent] = useState("");

  return (
    <div className="w-full h-full mt-1">
      <textarea
        className="w-full h-full outline-none text-xl p-8"
        defaultValue={entry.content}
        name=""
        id=""
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
