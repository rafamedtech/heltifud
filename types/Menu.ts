type Meal = {
  mainDish: {
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
  dayOfWeek: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

type WeeklyMenu = DayMenu[];

type Menu = {
  id: number;
  startDate: string;
  endDate: string;
  weekMenus: WeeklyMenu;
};

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
