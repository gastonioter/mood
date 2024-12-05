import { prisma } from "@/lib/prisma";
import { getUserByClerkId } from "@/utils/auth";

export const getSentimentsScore = async () => {
  const user = await getUserByClerkId();

  if (!user) {
    return {
      status: 401,
      message: "No Auth",
    };
  }

  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc", 
    },
  });

  const summ = analyses.reduce((all, curr) => all + curr.sentimentScore, 0);
  const avg = Math.round(summ / analyses.length);
  return { analyses, avg };
};
