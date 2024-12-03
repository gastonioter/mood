import { getUserByClerkId } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "a new journal!",
    },
  });

  return NextResponse.json({ data: entry });
};
