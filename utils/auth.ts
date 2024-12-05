import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const syncUserWithClerk = async () => {
  const { userId } = await auth();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: userId as string,
    },
  });

  if (match) return true;

  //  A brand new user was created and needs to be in sync with our DB

  const clerkUser = await currentUser();
  if (!clerkUser) return false;

  const user = await prisma.user.create({
    data: {
      clerkId: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
    },
  });

  return user;
};

export const getUserByClerkId = async () => {
  const { userId } = await auth();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId as string,
    },
  });

  return user;
};
