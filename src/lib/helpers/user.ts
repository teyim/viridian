import prisma from "../prisma";

// find user by user id
export async function fingUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
}
