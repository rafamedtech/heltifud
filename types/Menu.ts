import type { Menu, Dish } from "@prisma/client";

export type DishType = Dish;

export type Meal = {
  mainDish: Dish;
  side1: Dish;
  side2: Dish;
};

export type DayMenu = {
  dayOfWeek: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

export type WeekMenu = Menu & {
  dayMenus: DayMenu[];
};

export type MenuOutline = {
  id: number;
  name: string | null | undefined;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dayMenus: DayMenu[] | null | undefined;
};

// type Menu = {
//   id: number;
//   startDate: string;
//   endDate: string;
//   dayMenus: DayMenu[];
//   isActive: boolean;

// };

// import type { Day, Meal } from '@prisma/client';

// export type DayWithMeals = Day & {
//   breakfast: Meal[] | null | undefined;
//   lunch: Meal[] | null | undefined;
//   dinner: Meal[] | null | undefined;
// };

// export type Course = Meal[] | undefined | null;

// export type MealType = Meal;

// export type OrderPlan = {
//   name: string;
//   price: number;
//   meals: DayWithMeals[] | null | undefined;
// };

// export type Order = {
//   name: string;
//   phone: string;
//   address: string;
//   plans: OrderPlan[];
//   total: number;
// };
