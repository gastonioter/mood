import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/lib/prisma";
import { analize } from "@/utils/ai";
import { NextResponse } from "next/server";

type UpdatePayloadType = {
  content: string;
};

type Params = Promise<{
  id: string;
}>;

export const PATCH = async (
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse> => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const { id: entryId } = await params;

  const data: UpdatePayloadType = await req.json();
  const { content } = data;

  const entry = await prisma.journalEntry.update({
    where: {
      id: entryId,
      userId: user.id,
    },
    data: {
      content,
    },
  });

  const analysis = await analize(content);

  if (!analysis) {
    return NextResponse.json({
      status: 500,
      message: "Failed to analyze content",
    });
  }

  const savedAnalysis = await prisma.analysis.upsert({
    create: {
    ...analysis,
      entryId,
      userId: user.id,
    },
    where: {
      entryId,
      userId: user.id,
    },
    update: {
      ...analysis,
    },
  });

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } });
};
