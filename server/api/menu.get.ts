export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const menu = await $fetch(
    'https://script.google.com/macros/s/AKfycby259dgbinrdic5-e72t4LRpynFvlYaxQChqoPJ-Z5AaqSjLFq5cU-a-kEXC1zYdOCX/exec'
  );

  return JSON.parse(menu as string);
});
