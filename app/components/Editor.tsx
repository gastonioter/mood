"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntryType } from "@/utils/types";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Editor({ entry }: { entry: JournalEntryType }) {
  const [content, setContent] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const {
    summary = "",
    subject = "",
    negative = "",
    color = "",
    mood = "",
  } = analysis || {};

  const dataAnalysis = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative },
    { name: "Color", value: color },
  ];

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    save();
  };

  const save = useDebouncedCallback(async () => {
    setIsSaving(true);
    const updatedEntry = await updateEntry({
      id: entry.id,
      content: content.trim(),
    });
    setAnalysis(updatedEntry.analysis);
    setIsSaving(false);
  }, 2000);

  return (
    <div className="flex flex-col h-full lg:flex-row">
      {isSaving && (
        <div className="absolute text-lg top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center pointer-events-none">
          Analysing...
        </div>
      )}
      <textarea
        className={clsx(
          "w-full flex-basis-[260px] lg:flex-1 p-8 outline-none  text-xl resize-none",
          {
            "text-gray-400": isSaving,
          }
        )}
        value={content}
        placeholder="Start typing something about your day..."
        onChange={handleTyping}
      ></textarea>

      <div className="border-l h-full">
        <h2
          style={{
            backgroundColor: analysis?.color,
          }}
          className="p-5 text-2xl flex items-center "
        >
          {mood.toUpperCase() || "Analysis"}
          <Image
            alt="mood logo"
            width={80}
            height={100}
            src={"/mood-logo.png"}
            className="ml-auto"
          ></Image>
        </h2>
        <div>
          <ul className="">
            {dataAnalysis.map((item) => (
              <li
                key={item.name}
                className="p-4 border-b gap-3 leading-5 botder-t border-black/10 flex items-center justify-between"
              >
                <span className="font-semibold text-lg">{item.name}</span>
                <span className="text-right">{item.value.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
