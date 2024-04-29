import { User } from "@prisma/client";
import { calculateXpPoints } from ".";
import prisma from "../prisma";

// find user by user id
export async function findUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { unlockedTrees: true },
  });

  return user;
}

//
export async function updateUserStats(commits: number, user: User | null) {
  try {
    // fetch current user xp points
    const currentData = await prisma.user.findUnique({
      where: { id: user?.id },
      select: { xp: true, stats: true },
    });

    const calculatedXpPoints = calculateXpPoints(commits);
    const updatedCommitCount = commits + (currentData?.stats?.commits ?? 0);

    const newXpPoint = calculatedXpPoints + (currentData?.xp ?? 0);

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
        stats: { commits: updatedCommitCount },
        xp: newXpPoint,
        lastActivity: now,
        level: unlockedTrees?.length,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
