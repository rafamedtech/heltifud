export async function useMenu() {
  const { data: dishes } = await useFetch("/api/dishes/all-dishes");

  return {
    dishes,
  };
}
