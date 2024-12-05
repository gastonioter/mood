"use client";

import Spinner from "@/app/ui/Spinner";
import { makeQuestion } from "@/utils/api";
import { useState } from "react";

export default function Question() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    const answer = await makeQuestion(question);
    setAnswer(answer);
    setLoading(false);
  }

  return (
    <>
      <div className="mb-3">
        <form
          className="md:flex gap-2 items-center justify-between"
          onSubmit={handleSubmit}
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about your mood..."
            id="search"
            className="rounded-lg mb-2 md:mb-0 border-black/10 p-3 focus:border-blue-500 border-2 w-full outline-none"
          />
          <button
            type="submit"
            className="bg-blue-300 w-full md:basis-1/4 hover:bg-blue-400 transition p-3 rounded-lg"
          >
            Ask
          </button>
        </form>
      </div>
      <div className="">
        {answer && <p className="">{answer}</p>}
        {loading && (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
