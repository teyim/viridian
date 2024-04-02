import { User } from "@prisma/client";
import { calculateXpPoints } from ".";
import prisma from "../prisma";

// find user by user id
export async function findUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
}

//
export async function updateUserStats(commits: number, user: User | null) {
  try {
    // fetch current user xp points
    const currentXp = await prisma.user.findUnique({
      where: { id: user?.id },
      select: { xp: true },
    });

    const calculatedXpPoints = calculateXpPoints(commits);

    const newXpPoint = calculatedXpPoints + (currentXp?.xp ?? 0);

    const availableTrees = await prisma.tree.findMany({
      where: { xpThreshold: { lte: newXpPoint } }, // Find trees with unlockXp <= newXpPoint
    });

    const unlockedTrees = user?.unlockedTreeId;

    for (const tree of availableTrees) {
      if (newXpPoint >= tree.xpThreshold && !unlockedTrees?.includes(tree.id)) {
        unlockedTrees?.push(tree.id);
      }
    }

    const now = new Date(); // Get the current time

    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        unlockedTreeId: unlockedTrees,
        stats: { commits: commits },
        lastActivity: now,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
