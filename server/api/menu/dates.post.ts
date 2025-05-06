import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ["POST"]);
  const { dates } = await readBody(event);

  const updatedDates = await prisma.menu.update({
    where: {
      id: dates.id,
    },
    data: {
      startDate: dates.startDate,
      endDate: dates.endDate,
    },
  });

  return updatedDates;
});
