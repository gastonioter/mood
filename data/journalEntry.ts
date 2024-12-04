import { prisma } from "@/lib/prisma";
import { getUserByClerkId } from "./user";

export const getEntries = async () => {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analisis: true,
    },
  });

  return entries;
};

export const getEntryById = async (id: string) => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      analisis: true,
    },
  });

  return entry;
};
