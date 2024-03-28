import { User } from "@prisma/client";
import prisma from "./prisma";

export async function createUserWithInitialTree(userData: User | null) {
  const freeTree = await prisma.tree.findFirst({
    where: { xpThreshold: 0 }, // Or your criteria for the free tree
  });

  if (!freeTree) {
    throw new Error("No free tree found!");
  }

  if (!userData) {
    throw new Error("NO user data!");
  }

  await prisma.user.update({
    where: {
      id: userData.id as string,
      NOT: { initialTreeUnlocked: true },
    }, // Unique identifier & flag check
    data: {
      unlockedTrees: { connect: { id: freeTree.id } },
      initialTreeUnlocked: { set: true }, // Set flag after unlocking
    },
  });
}
