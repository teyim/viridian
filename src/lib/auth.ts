import { User } from "@prisma/client";
import prisma from "./prisma";

export async function createUserWithInitialTree(userData: User | null) {
  const freeTree = await prisma.tree.findFirst({
    where: { xpThreshold: 0 },
  });

  if (!freeTree) {
    throw new Error("No free tree found!");
  }

  const user = await prisma.user.findUnique({
    where: { email: userData?.email ?? "" }, // Or your unique identifier
  });

  if (!user || user.initialTreeUnlocked) {
    return; // User already exists or tree already unlocked
  }

  await prisma.user.update({
    where: { email: userData?.email ?? "" }, // Or your unique identifier
    data: {
      unlockedTrees: { connect: { id: freeTree.id } },
      initialTreeUnlocked: true, // Set the flag after unlocking
    },
  });

  return user;
}
