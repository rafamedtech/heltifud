import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const day1 = await prisma.day.create({
    data: {
      name: 'Lunes',
      breakfast: {
        create: [
          {
            name: 'Huevos con pechuga de pavo',
            calories: 240,
            type: 'breakfast',
          },
          {
            name: 'Frijol',
            calories: 347,
            type: 'side',
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Salpicón de res',
            calories: 352,
            type: 'main',
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Sandwich de pollo',
            calories: 423,
            type: 'main',
          },
          {
            name: 'Papas horneadas',
            calories: 131,
            type: 'side',
          },
        ],
      },
    },
  });
  const day2 = await prisma.day.create({
    data: {
      name: 'Martes',
      breakfast: {
        create: [
          {
            name: 'Huevos a la mexicana',
            calories: 222,
            type: 'breakfast',
          },
          {
            name: 'Frijol entero',
            calories: 347,
            type: 'side',
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Pescado empanizado',
            calories: 234,
            type: 'main',
          },
          {
            name: 'Puré de papa',
            calories: 170,
            type: 'side',
          },
          {
            name: 'Verduras al vapor',
            calories: 43,
            type: 'side',
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Fajitas de pollo',
            calories: 196,
            type: 'main',
          },
          {
            name: 'Arroz blanco',
            calories: 185,
            type: 'side',
          },
          {
            name: 'Verduras al vapor',
            calories: 43,
            type: 'side',
          },
        ],
      },
    },
  });
  const day3 = await prisma.day.create({
    data: {
      name: 'Miércoles',
      breakfast: {
        create: [
          {
            name: 'Huevos con salchicha',
            calories: 276,
            type: 'breakfast',
          },
          {
            name: 'Frijol',
            calories: 347,
            type: 'side',
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Teriyaki de pollo',
            calories: 256,
            type: 'main',
          },
          {
            name: 'Arroz blanco',
            calories: 185,
            type: 'side',
          },
          {
            name: 'Arroz blanco',
            calories: 185,
            type: 'side',
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Ensalada fría de pollo',
            calories: 511,
            type: 'main',
          },
        ],
      },
    },
  });
  const day4 = await prisma.day.create({
    data: {
      name: 'Jueves',
      breakfast: {
        create: [
          {
            name: 'Papas con salchicha',
            calories: 200,
            type: 'breakfast',
          },
          {
            name: 'Frijol',
            calories: 347,
            type: 'side',
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Pescado a la mostaza',
            calories: 148,
            type: 'main',
          },
          {
            name: 'Arroz rojo',
            calories: 189,
            type: 'side',
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Fajitas de res',
            calories: 149,
            type: 'main',
          },
          {
            name: 'Pasta con tomate',
            calories: 284,
            type: 'side',
          },
        ],
      },
    },
  });
  const day5 = await prisma.day.create({
    data: {
      name: 'Viernes',
      breakfast: {
        create: [
          {
            name: 'Huevos revueltos',
            calories: 299,
            type: 'breakfast',
          },
          {
            name: 'Frijol entero',
            calories: 347,
            type: 'side',
          },
        ],
      },
      lunch: {
        create: [
          {
            name: 'Carne molida con verduras',
            calories: 242,
            type: 'main',
          },
          {
            name: 'Pasta con tomate',
            calories: 284,
            type: 'side',
          },
        ],
      },
      dinner: {
        create: [
          {
            name: 'Deshebrada de pollo',
            calories: 142,
            type: 'main',
          },
          {
            name: 'Frijol',
            calories: 347,
            type: 'side',
          },
        ],
      },
    },
  });

  console.log({ day1, day2, day3, day4, day5 });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
