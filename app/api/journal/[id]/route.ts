import { getUserByClerkId } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { analize } from "@/utils/ai";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type UpdatePayloadType = {
  content: string;
};

type Params = Promise<{
  id: string;
}>;

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const user = await getUserByClerkId();

  if (!user) {
    return {
      status: 401,
      json: {
        error: "Unauthorized",
      },
    };
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
    return {
      status: 500,
      json: {
        error: "Failed to analyze content",
      },
    };
  }

  const savedAnalisis = await prisma.analysis.upsert({
    create: {
      ...analysis,
      entryId,
    },
    update: {
      ...analysis,
    },
    where: {
      entryId,
    },
  });

  return NextResponse.json({ data: { ...entry, analysis: savedAnalisis } });
};
