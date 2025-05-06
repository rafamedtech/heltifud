import { PrismaClient } from "@prisma/client";
import { mealTransformer } from "../transformers/weekmenu";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ["GET"]);

  const currentMenu = await prisma.menu.findFirst({
    where: {
      isActive: true,
    },
  });

  const rawMenu = await prisma.menu.findFirst({
    where: {
      id: currentMenu?.id! + 1,
    },
    include: {
      dayMenus: {
        include: {
          breakfast: { include: { mainDish: true, side1: true, side2: true } },
          lunch: { include: { mainDish: true, side1: true, side2: true } },
          dinner: { include: { mainDish: true, side1: true, side2: true } },
        },
        orderBy: { id: "asc" },
      },
    },
  });

  const menu = {
    ...rawMenu,
    weekMenus: rawMenu?.dayMenus.map((day) => ({
      id: day.id,
      dayOfWeek: day.dayOfWeek,
      breakfast: mealTransformer(day.breakfast),
      lunch: mealTransformer(day.lunch),
      dinner: mealTransformer(day.dinner),
    })),
  };

  return menu;
});
