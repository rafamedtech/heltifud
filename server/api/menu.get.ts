import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const menu = await $fetch(
    'https://script.google.com/macros/s/AKfycbw25To5LCIRdNAy9CWxOC6GNM_2gsIMpyHr6H6MFKIDBojAcopUcaHAFw6NwaK2DKoK/exec'
  );

  return JSON.parse(menu as string);
});
