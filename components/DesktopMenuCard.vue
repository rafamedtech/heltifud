<script setup lang="ts">
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
  <div class="hidden lg:block max-w-lg bg-white min-h-[35rem] max-h-[30rem]">
    <div class="collapse-title text-xl font-medium h-16">
      <h2 class="card-title text-base-100 text-3xl">{{ day.name }}</h2>
    </div>

    <div
      class="justify-between flex flex-col rounded-none min-h-[31rem] h-[31rem] max-h-[31rem] bg-white text-base-100 lg:text-xs p-4"
    >
      <ul class="flex flex-col gap-4 flex-1 items-stretch">
        <li v-for="course in day.courses" class="h-full min-h-max">
          <h3 class="font-bold text-xl text-primary">{{ course.name }}</h3>

          <ul class="flex gap-1 justify-between w-full flex-col mt-2">
            <li v-for="meal in course.meals">
              <article class="flex gap-1">
                <Icon name="icon-park-outline:arrow-right" class="text-primary" />
                <section class="flex justify-between w-full">
                  <span class="w-2/3 block"> {{ meal.name }}</span>
                  <span class="w-1/3 block text-end">{{ meal.calories }} Cal</span>
                </section>
              </article>
            </li>
          </ul>
        </li>
      </ul>

      <section class="mt-8 flex gap-2 items-center justify-end w-full h-16">
        <span class="font-bold text-primary">Total:</span>
        <p class="w-fit text-end font-bold">{{ sumCaloriesForDay(day) }} Cal</p>
      </section>
    </div>
  </div>
</template>
