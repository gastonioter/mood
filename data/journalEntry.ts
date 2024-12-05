import { prisma } from "@/lib/prisma";
import { getUserByClerkId } from "../utils/auth";

export const getEntries = async () => {
  const user = await getUserByClerkId();
  if (!user) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};

export const getEntryById = async (id: string) => {
  const user = await getUserByClerkId();
  if (!user) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};
