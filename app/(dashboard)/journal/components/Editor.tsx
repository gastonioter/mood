"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntryType } from "@/utils/types";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useAutosave } from "react-autosave";

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
    { name: "Negative", value: negative ? "YES" : " NO" },
    { name: "Color", value: color },
  ];

  useAutosave({
    data: content, // data to watch for changes

    onSave: async (_text: string) => {
      if (_text === entry.content) return;

      setIsSaving(true);
      const updatedEntry = await updateEntry({ id: entry.id, content: _text });
      setAnalysis(updatedEntry.analysis);
      setIsSaving(false);
    }, // function to call when data changes

    interval: 2000,
    saveOnUnmount: false,
  });

  return (
    <div className="flex">
      {isSaving && (
        <div className="absolute text-lg top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center pointer-events-none">
          Analysing...
        </div>
      )}
      <textarea
        className={clsx("w-full h-full outline-none text-xl p-8 resize-none", {
          "text-gray-400": isSaving,
        })}
        value={content}
        placeholder="Start typing something about your day..."
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="basis-[65%]">
        <h2
          style={{
            backgroundColor: analysis?.color,
          }}
          className=" p-5 text-2xl flex items-center "
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
                className="px-2 py-4 border-b botder-t border-black/10 flex items-center justify-between"
              >
                <span className="font-semibold text-lg">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
