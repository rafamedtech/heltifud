import { PrismaClient } from '@prisma/client';
import { weekMenuTransformer } from '../transformers/weekmenu';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const weekMenu = await prisma.weekMenu.findMany({
    include: {
      breakfast: {
        include: {
          mainDish: true,
          side1: true,
          side2: true,
        },
      },
      lunch: {
        include: {
          mainDish: true,
          side1: true,
          side2: true,
        },
      },
      dinner: {
        include: {
          mainDish: true,
          side1: true,
          side2: true,
        },
      },
    },
  });
  const menu = weekMenuTransformer(weekMenu);

  return menu;
});
