import type { Dish } from "@prisma/client";
import type { WeekMenu } from "~/types/Menu";

export function useMenu() {
  const getDishes = async () => {
    try {
      const { data: dishes } = await useFetch<Dish[]>("/api/dishes");
      return dishes;
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const getNextMenu = async () => {
    try {
      const { data: menu } = await useFetch<WeekMenu>("/api/next-menu");
      return menu;
    } catch (error) {
      console.error("Error fetching next menu:", error);
    }
  };

  return {
    getDishes,
    getNextMenu,
  };
}
