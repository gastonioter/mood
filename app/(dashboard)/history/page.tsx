import HistoryChart from "@/app/components/HistoryChart";
import { getSentimentsScore } from "@/data/analysis";

export default async function History() {
  const { avg, analyses } = await getSentimentsScore();

  return (
    <div className="p-10 bg-zinc-300/10 h-full">
      <h2 className="text-3xl mb-8">History</h2>
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${avg}`}</h1>
      </div>
      <div className=" h-[400px] ">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
}
