import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const dishes = await prisma.dish.findMany({
    orderBy: { id: "desc" },
  });

  return dishes;
});
