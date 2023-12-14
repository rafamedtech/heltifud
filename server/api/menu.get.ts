import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  return prisma.day.findMany({
    include: {
      breakfast: true,
      lunch: true,
      dinner: true,
    },
  });
});
