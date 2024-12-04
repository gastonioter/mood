"use client";

import { useState } from "react";

export default function Question() {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form action="" className="flex gap-4" onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question something about your mood..."
        id="search"
        className="rounded-lg w-full border-black/10 p-3 focus:border-blue-500 border-2 outline-none "
      />
      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 transition  py-2 px-6 rounded-lg"
      >
        Ask
      </button>
    </form>
  );
}
