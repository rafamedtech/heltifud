import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const prisma = new PrismaClient();

  const menus = await prisma.menu.findMany({
    orderBy: { id: 'desc' },
    include: {
      dayMenus: {
        orderBy: { id: 'asc' },
        include: {
          breakfast: { include: { mainDish: true, side1: true, side2: true } },
          lunch: { include: { mainDish: true, side1: true, side2: true } },
          dinner: { include: { mainDish: true, side1: true, side2: true } },
        },
      },
    },
  });

  return menus;
});
