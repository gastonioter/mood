import { getEntryById } from "@/data/journalEntry";
import Image from "next/image";

export default async function Analisis({ entry }) {
  const dataAnalisis = [
    { name: "Summary", value: entry?.analisis?.summary },
    { name: "Subject", value: entry?.analisis?.subject },
    { name: "Mood", value: entry?.analisis?.mood },
    { name: "Negative", value: entry?.analisis?.negative },
    { name: "Color", value: entry?.analisis?.color },
  ];
  return (
    <>
      <h2
        style={{
          backgroundColor: entry?.analisis?.color,
        }}
        className=" p-5 text-2xl flex items-center justify-between"
      >
        Analisis {entry.analisis?.mood}
        <Image
          alt="mood logo"
          width={80}
          height={100}
          src={"/mood-logo.png"}
          className=""
        ></Image>
      </h2>
      <div>
        <ul className="">
          {dataAnalisis.map((item) => (
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
    </>
  );
}
