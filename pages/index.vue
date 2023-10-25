<script setup lang="ts">
import { menu } from '@/utils/menu';

const isLoading = ref(true);

onMounted(() => (isLoading.value = false));

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
        <section class="grid gap-4 lg:grid-cols-5">
          <div v-for="day in menu.days">
            <div class="collapse lg:hidden rounded-none lg:max-w-lg bg-white">
              <input type="radio" name="my-accordion-1" />
              <div class="collapse-title text-xl font-medium">
                <h2 class="card-title text-base-100 text-3xl">{{ day.name }}</h2>
              </div>
              <div class="collapse-content lg:text-xs">
                <div class="justify-between rounded-none h-full bg-white text-base-100">
                  <div class="">
                    <!-- <h2 class="card-title text-primary mb-6 text-3xl">{{ day.name }}</h2> -->
                    <section>
                      <ul class="flex flex-col gap-4">
                        <li v-for="course in day.courses">
                          <h3 class="font-bold text-xl text-primary">{{ course.name }}</h3>
                          <ul>
                            <li v-for="meal in course.meals">
                              <ul class="flex flex-col gap-2">
                                <li class="flex gap-2 justify-between w-full">
                                  <span class="w-1/2 block"> {{ meal.main.name }}</span>
                                  <span class="w-1/2 block text-end"
                                    >{{ meal.main.calories }} Cal</span
                                  >
                                </li>
                                <li v-if="meal.side" class="flex gap-2 justify-between w-full">
                                  <span class="w-1/2 block"> {{ meal.side?.name }}</span>
                                  <span class="w-1/2 block text-end"
                                    >{{ meal.side?.calories }} Cal</span
                                  >
                                </li>
                                <!-- <li v-if="meal.side2">
                            <span>{{ meal.side2?.name }}</span>
                          </li> -->
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </section>
                    <section class="mt-8 flex justify-end gap-2 items-center w-full">
                      <span class="font-bold">Total:</span>
                      <p class="w-fit text-end">{{ day.totalCalories }} Cal</p>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div class="hidden lg:block max-w-lg bg-white min-h-[30rem] max-h-[30rem]">
              <!-- <input type="radio" name="my-accordion-1" /> -->
              <div class="collapse-title text-xl font-medium">
                <h2 class="card-title text-base-100 text-3xl">{{ day.name }}</h2>
              </div>
              <div class="lg:text-xs p-4 h-full">
                <div
                  class="justify-between flex flex-col rounded-none h-full bg-white text-base-100"
                >
                  <div class="">
                    <!-- <h2 class="card-title text-primary mb-6 text-3xl">{{ day.name }}</h2> -->
                    <section>
                      <ul class="flex flex-col gap-4">
                        <li v-for="course in day.courses">
                          <h3 class="font-bold text-xl text-primary">{{ course.name }}</h3>
                          <ul>
                            <li v-for="meal in course.meals">
                              <ul class="flex flex-col gap-2">
                                <li class="flex gap-2 justify-between w-full">
                                  <span class="w-1/2 block"> {{ meal.main.name }}</span>
                                  <span class="w-1/2 block text-end"
                                    >{{ meal.main.calories }} Cal</span
                                  >
                                </li>
                                <li v-if="meal.side" class="flex gap-2 justify-between w-full">
                                  <span class="w-1/2 block"> {{ meal.side?.name }}</span>
                                  <span class="w-1/2 block text-end"
                                    >{{ meal.side?.calories }} Cal</span
                                  >
                                </li>
                                <!-- <li v-if="meal.side2">
                            <span>{{ meal.side2?.name }}</span>
                          </li> -->
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <section class="mt-8 flex justify-end gap-2 items-center w-full">
                    <span class="font-bold">Total:</span>
                    <p class="w-fit text-end">{{ day.totalCalories }} Cal</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </template>
  </MainSection>
</template>
