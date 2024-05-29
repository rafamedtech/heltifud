import { PrismaClient } from '@prisma/client';
import { weekMenuTransformer, mealTransformer, dishTransformer } from '../transformers/weekmenu';
import { raw } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  // const weekMenu = await prisma.weekMenu.findMany({
  //   include: {
  //     breakfast: {
  //       include: {
  //         mainDish: true,
  //         side1: true,
  //         side2: true,
  //       },
  //     },
  //     lunch: {
  //       include: {
  //         mainDish: true,
  //         side1: true,
  //         side2: true,
  //       },
  //     },
  //     dinner: {
  //       include: {
  //         mainDish: true,
  //         side1: true,
  //         side2: true,
  //       },
  //     },
  //   },
  // });
  // const menu = weekMenuTransformer(weekMenu);

  const rawMenu = await prisma.menu.findFirst({
    where: { id: 2 },
    include: {
      weekMenus: {
        include: {
          breakfast: { include: { mainDish: true, side1: true, side2: true } },
          lunch: { include: { mainDish: true, side1: true, side2: true } },
          dinner: { include: { mainDish: true, side1: true, side2: true } },
        },
      },
    },
  });

  const menu = {
    ...rawMenu,
    weekMenus: rawMenu?.weekMenus.map((day) => ({
      id: day.id,
      dayOfWeek: day.dayOfWeek,
      breakfast: mealTransformer(day.breakfast),
      lunch: mealTransformer(day.lunch),
      dinner: mealTransformer(day.dinner),
    })),
  };

  return menu;
});
