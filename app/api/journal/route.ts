import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "",
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};
