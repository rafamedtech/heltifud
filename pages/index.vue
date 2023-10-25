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
        <section class="flex lg:hidden justify-center items-center gap-4">
          <Icon name="icon-park-outline:arrow-left" size="32" class="text-primary" />
          <span class="text-base-100 text-center block text-lg">Desliza para ver todo</span>
          <Icon name="icon-park-outline:arrow-right" size="32" class="text-primary" />
        </section>
        <div class="carousel lg:hidden carousel-center max-w-sm p-4 pb-8 lg:max-w-fit space-x-4">
          <div class="carousel-item" v-for="day in menu.days">
            <div
              class="card justify-between rounded-none max-w-xs h-[32rem] bg-white shadow-xl text-base-100"
            >
              <div class="card-body">
                <h2 class="card-title text-primary mb-6 text-3xl">{{ day.name }}</h2>
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
                <section class="mt-8 flex justify-between items-center w-full">
                  <span class="font-bold text-xl">Total de calorías:</span>
                  <p class="w-fit text-end">{{ day.totalCalories }} Cal</p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <section class="hidden lg:grid lg:grid-cols-3 gap-8">
          <div v-for="day in menu.days">
            <div
              class="card justify-between rounded-none h-[32rem] bg-white shadow-xl text-base-100"
            >
              <div class="card-body">
                <h2 class="card-title text-primary mb-6 text-3xl">{{ day.name }}</h2>
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
                <section class="mt-8 flex justify-between items-center w-full">
                  <span class="font-bold text-xl">Total de calorías:</span>
                  <p class="w-fit text-end">{{ day.totalCalories }} Cal</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </section>
    </template>
  </MainSection>
</template>
