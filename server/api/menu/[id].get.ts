import { PrismaClient } from '@prisma/client';
import { mealTransformer } from '../../transformers/weekmenu';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const { id }: any = event.context.params;

  const rawMenu = await prisma.menu.findFirst({
    where: { id: parseInt(id) },
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

  const menu = {
    ...rawMenu,
    dayMenus: rawMenu?.dayMenus.map((day) => ({
      id: day.id,
      dayOfWeek: day.dayOfWeek,
      breakfast: mealTransformer(day.breakfast),
      lunch: mealTransformer(day.lunch),
      dinner: mealTransformer(day.dinner),
    })),
  };

  return menu;
});
