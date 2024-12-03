import { getEntryById } from "@/data/journalEntry";
import Editor from "../components/Editor";
import { notFound } from "next/navigation";
import Image from "next/image";

type Params = Promise<{
  id: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const entry = await getEntryById(id);

  if (!entry) {
    notFound();
  }

  const dataAnalisis = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "" },
  ];
  return (
    <div className="flex h-full">
      <div className="flex-1 p-3">
        <Editor entry={entry} />
      </div>
      <div className="basis-1/3 border-l border-black/10">
        <h2 className="bg-blue-400 p-5 text-2xl flex items-center justify-between">
          Analisis
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
      </div>
    </div>
  );
}
