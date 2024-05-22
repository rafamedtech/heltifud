export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET']);

  const menu = await $fetch(
    'https://script.google.com/macros/s/AKfycbwuL4h0Igmlxkdk6V7q_Q1qJSW2iUdIpiwvMlHItl5AJZO5RHlX4xEuQ0eIEQ3e8DsS/exec'
  );

  return JSON.parse(menu as string);
});
