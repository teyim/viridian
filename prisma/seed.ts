import { trees } from "../src/contants";
import prisma from "../src/lib/prisma";

async function seed() {
  const createdTrees = await prisma.tree.createMany({
    data: trees,
  });

  console.log(createdTrees);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
