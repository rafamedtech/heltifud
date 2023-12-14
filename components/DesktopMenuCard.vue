<script setup lang="ts">
import type { DayWithMeals, Course, MealType } from '@/types/Menu';

const { day } = defineProps<{
  day: DayWithMeals;
}>();

const breakfast = day.breakfast as Course;
const lunch = day.lunch as Course;
const dinner = day.dinner as Course;

const sumCaloriesForDay = (day: DayWithMeals): number => {
  let totalCalories = 0;
  ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
    const meals = day[mealType as keyof DayWithMeals] as MealType[];
    meals.forEach((meal) => {
      totalCalories += meal.calories;
    });
  });
  return totalCalories;
};
</script>
<template>
  <div class="hidden lg:block max-w-lg bg-white min-h-[35rem] max-h-[30rem]">
    <div class="collapse-title text-xl font-medium h-16">
      <h2 class="card-title text-base-300 text-3xl">{{ day.name }}</h2>
    </div>

    <div
      class="justify-between flex flex-col rounded-none min-h-[31rem] h-[31rem] max-h-[31rem] bg-white text-base-300 lg:text-xs p-4"
    >
      <ul class="flex flex-col gap-4 flex-1 items-stretch">
        <MealCourse title="Desayuno" :course="breakfast" />
        <MealCourse title="Comida" :course="lunch" />
        <MealCourse title="Cena" :course="dinner" />
      </ul>

      <section class="mt-8 flex gap-2 items-center justify-end w-full h-16">
        <span class="font-bold text-primary">Total:</span>
        <p class="w-fit text-end font-bold">{{ sumCaloriesForDay(day) }} Cal</p>
      </section>
    </div>
  </div>
</template>
