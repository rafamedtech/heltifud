import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const dishes = await prisma.dish.findMany();

  return dishes;
});
