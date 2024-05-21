import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });

  return recipes;
});
