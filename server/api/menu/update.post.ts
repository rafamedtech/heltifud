import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Day = {
  id: string;
  breakfastDayId: string;
  lunchDayId: string;
  dinnerDayId: string;
};

export default defineEventHandler(async (event) => {
  assertMethod(event, ['POST']);
  const { days } = await readBody(event);

  const deleteMeals = await prisma.meal.deleteMany();

  return days.forEach(async (day: any) => {
    await prisma.day.update({
      where: {
        id: day.id,
      },
      include: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
      data: {
        breakfast: {
          create: day.breakfast.map(
            ({ id, breakfastDayId, lunchDayId, dinnerDayId, ...rest }: Day) => rest
          ),
        },
        lunch: {
          create: day.lunch.map(
            ({ id, breakfastDayId, lunchDayId, dinnerDayId, ...rest }: Day) => rest
          ),
        },
        dinner: {
          create: day.dinner.map(
            ({ id, breakfastDayId, lunchDayId, dinnerDayId, ...rest }: Day) => rest
          ),
        },
      },
    });
  });
});
