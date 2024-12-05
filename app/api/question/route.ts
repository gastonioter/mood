import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/lib/prisma";
import { qa } from "@/utils/ai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }
  const { question } = await req.json();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
