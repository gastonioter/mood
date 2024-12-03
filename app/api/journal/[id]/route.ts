import { getUserByClerkId } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type UpdatePayloadType = {
  content: string;
};

type Params = Promise<{
  id: string;
}>;

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const user = await getUserByClerkId();
  const { id } = await params;

  const data: UpdatePayloadType = await req.json();
  const { content } = data;

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
