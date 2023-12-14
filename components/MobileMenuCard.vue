<script setup lang="ts">
import type { DayWithMeals, Course, MealType } from '@/types/Menu';

const { day } = defineProps<{
  day: DayWithMeals;
}>();

const breakfast = day.breakfast as Course;
const lunch = day.lunch as Course;
const dinner = day.dinner as Course;

function sumCaloriesForDay(day: DayWithMeals): number {
  let totalCalories = 0;
  ['breakfast', 'lunch', 'dinner'].forEach((mealType) => {
    const meals = day[mealType as keyof DayWithMeals] as MealType[];
    meals.forEach((meal) => {
      totalCalories += meal.calories;
    });
  });
  return totalCalories;
}
</script>

<template>
  <div tabindex="0" class="collapse lg:hidden rounded-none lg:max-w-lg bg-white collapse-arrow">
    <input type="radio" name="my-accordion-1" />
    <div class="collapse-title text-xl font-medium">
      <h2 class="card-title text-base-300 text-3xl">{{ day.name }}</h2>
    </div>
    <div class="collapse-content lg:text-xs">
      <div class="justify-between rounded-none h-full bg-white text-base-300">
        <section>
          <ul class="flex flex-col gap-4">
            <MealCourse title="Desayuno" :course="breakfast" />
            <MealCourse title="Comida" :course="lunch" />
            <MealCourse title="Cena" :course="dinner" />
          </ul>
        </section>
        <section class="mt-8 flex gap-2 items-center justify-end w-full h-16">
          <span class="font-bold text-primary">Total:</span>
          <p class="w-fit text-end font-bold">{{ sumCaloriesForDay(day) }} Cal</p>
        </section>
      </div>
    </div>
  </div>
</template>
