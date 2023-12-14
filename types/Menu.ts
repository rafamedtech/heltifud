import type { Day, Meal } from '@prisma/client';

export type DayWithMeals = Day & {
  breakfast: Meal[] | null;
  lunch: Meal[] | null;
  dinner: Meal[] | null;
};

export type Course = Meal[];

export type MealType = Meal;
