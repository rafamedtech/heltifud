<script setup lang="ts">
import { menu } from '@/utils/menu';

const isLoading = ref(true);

onMounted(() => (isLoading.value = false));

const sumCaloriesForDay = (day: any) => {
  return day.courses.reduce((totalCalories: number, course: any) => {
    return totalCalories + course.meals.reduce((total: any, meal: any) => total + meal.calories, 0);
  }, 0);
};

useHead({
  title: 'Heltifud Meal preps',
  meta: [
    {
      name: 'description',
      content: 'Servicio de Meal preps saludables, caseros y flexibles a domicilio.',
    },
    // Facebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://heltifud.com/',
    },
    {
      property: 'og:title',
      content: 'Heltifud Meal preps',
    },
    {
      property: 'og:description',
      content: 'Servicio de Meal preps saludables, caseros y flexibles a domicilio.',
    },
    {
      property: 'og:image',
      content:
        'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Menú de la próxima semana" :description="menu.dates" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="mt-8">
        <section class="grid gap-2 lg:grid-cols-5">
          <div v-for="day in menu.days">
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
                  <section class="mt-8 flex justify-end gap-2 items-center w-full">
                    <span class="font-bold">Total:</span>
                    <!-- <p class="w-fit text-end">{{ day.totalCalories }} Cal</p> -->
                  </section>
                </div>
              </div>
            </div>

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

                <!-- <section>
                  <ul class="flex flex-col gap-4 h-full">
                    <li v-for="course in day.courses" class="min-h-[30%]">
                      <h3 class="font-bold text-xl text-primary">{{ course.name }}</h3>

                      <section class="flex gap-1 justify-between w-full flex-col mt-2">
                        <article v-for="meal in course.meals" class="flex gap-1">
                          <Icon name="icon-park-outline:arrow-right" class="text-primary" />
                          <section class="flex justify-between w-full">
                            <span class="w-2/3 block"> {{ meal.name }}</span>
                            <span class="w-1/3 block text-end">{{ meal.calories }} Cal</span>
                          </section>
                        </article>
                      </section>
                    </li>
                  </ul>
                </section> -->

                <section class="mt-8 flex gap-2 items-center w-full h-16">
                  <span class="font-bold">Total:</span>
                  <p class="w-fit text-end">{{ sumCaloriesForDay(day) }} Cal</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </section>
    </template>
  </MainSection>
</template>
