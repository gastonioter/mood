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
  const { id } = await params;

  const data: UpdatePayloadType = await req.json();
  const { content } = data;

  const entry = await prisma.journalEntry.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content,
    },
  });

  const analisis = await analize(content);

  if (!analisis) return;

  const savedAnalisis = await prisma.analisis.upsert({
    where: {
      entryId: entry.id,
    },
    create: {
      ...analisis,
      entryId: entry.id,
    },
    update: {
      ...analisis,
    },
  });

  const finalEntry = await prisma.journalEntry.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      analisisId: analisis.id,
    },
    include: {
      analisis: true,
    },
  });

  

  console.log(entry.id);

  return NextResponse.json({ data: finalEntry });
};
