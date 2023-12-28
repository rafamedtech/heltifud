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

  const daysWithoutId = days.map(({ id, ...rest }: { id: string }) => rest);

  const deleteDays = await prisma.day.deleteMany();
  const deleteMeals = await prisma.meal.deleteMany();

  return daysWithoutId.forEach(async (day: any) => {
    await prisma.day.create({
      include: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
      data: {
        name: day.name,
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
