"use client";

export default function NewEntrCard() {
  function handleNewEntry() {
    console.log("asdsd");
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
