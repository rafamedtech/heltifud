<script setup lang="ts">
import { menu } from '@/utils/menu';

const isLoading = ref(true);

onMounted(() => (isLoading.value = false));
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Menú de la semana" :description="menu.dates" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="mt-8">
        <section class="grid gap-4 lg:grid-cols-5">
          <div v-for="day in menu.days">
            <div class="collapse rounded-none lg:max-w-lg bg-white">
              <input type="radio" name="my-accordion-1" />
              <div class="collapse-title text-xl font-medium">
                <h2 class="card-title text-primary text-3xl">{{ day.name }}</h2>
              </div>
              <div class="collapse-content lg:text-xs">
                <div class="justify-between rounded-none h-full bg-white text-base-100">
                  <div class="">
                    <!-- <h2 class="card-title text-primary mb-6 text-3xl">{{ day.name }}</h2> -->
                    <section>
                      <ul class="flex flex-col gap-4">
                        <li v-for="course in day.courses">
                          <h3 class="font-bold text-xl">{{ course.name }}</h3>
                          <ul>
                            <li v-for="meal in course.meals">
                              <ul>
                                <li class="flex gap-2 justify-between w-full">
                                  <span class="w-2/3"
                                    ><Icon name="material-symbols:check-circle-outline" />
                                    {{ meal.main.name }}</span
                                  >
                                  <span class="w-1/3 text-end">{{ meal.main.calories }} Cal</span>
                                </li>
                                <li v-if="meal.side" class="flex gap-2 justify-between w-full">
                                  <span
                                    ><Icon name="material-symbols:check-circle-outline" />
                                    {{ meal.side?.name }}</span
                                  >
                                  <span>{{ meal.side?.calories }} Cal</span>
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
          </div>
        </section>
      </section>
    </template>
  </MainSection>
</template>
