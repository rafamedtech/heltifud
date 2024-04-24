type Meal = {
  main: {
    name: string;
    calories: number;
  };
  side1: {
    name: string;
    calories: number;
  };
  side2: {
    name: string;
    calories: number;
  };
};

type DayMenu = {
  day: string;
  desayuno: Meal;
  comida: Meal;
  cena: Meal;
};

type WeeklyMenu = DayMenu[];

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
