import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { expense } = await readBody(event);

  assertMethod(event, ['POST']);

  return prisma.expense.create({
    data: {
      ...expense,
    },
  });
});
