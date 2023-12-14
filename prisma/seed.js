import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const day1 = await prisma.day.create({
    data: {
      name: 'Monday',
      breakfast: {
        create: [
          {
            name: 'Scrambled eggs',
            calories: 200,
          },
          {
            name: 'Toast',
            calories: 100,
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Chicken salad',
            calories: 350,
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Grilled salmon',
            calories: 500,
          },
        ],
      },
    },
  });

  const day2 = await prisma.day.create({
    data: {
      name: 'Tuesday',
      breakfast: {
        create: [
          {
            name: 'Oatmeal',
            calories: 150,
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Turkey sandwich',
            calories: 300,
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Steak and potatoes',
            calories: 600,
          },
        ],
      },
    },
  });

  console.log({ day1, day2 });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
