<script setup lang="ts">
interface Day {
  name: string;
  courses: Course[];
}

interface Course {
  name: string;
  meals: Meal[];
}

interface Meal {
  id: number;
  name: string;
  calories: number;
}
defineProps<{
  day: Day;
}>();

const sumCaloriesForDay = (day: Day) => {
  return day.courses.reduce((totalCalories: number, course: Course) => {
    return (
      totalCalories + course.meals.reduce((total: number, meal: Meal) => total + meal.calories, 0)
    );
  }, 0);
};
</script>

<template>
  <div class="collapse lg:hidden rounded-none lg:max-w-lg bg-white">
    <input type="radio" name="my-accordion-1" />
    <div class="collapse-title text-xl font-medium">
      <h2 class="card-title text-base-100 text-3xl">{{ day.name }}</h2>
    </div>
    <div class="collapse-content lg:text-xs">
      <div class="justify-between rounded-none h-full bg-white text-base-100">
        <section>
          <ul class="flex flex-col gap-4">
            <li v-for="course in day.courses">
              <h3 class="font-bold text-xl text-primary">{{ course.name }}</h3>
              <ul class="mt-2">
                <li v-for="meal in course.meals">
                  <ul class="flex flex-col gap-2">
                    <li class="flex gap-2 justify-between w-full">
                      <Icon name="icon-park-outline:arrow-right" class="text-primary" />
                      <span class="w-1/2 block"> {{ meal.name }}</span>
                      <span class="w-1/2 block text-end">{{ meal.calories }} Cal</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
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
