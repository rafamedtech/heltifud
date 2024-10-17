<script setup lang="ts">
import type { WeekMenu } from "@/types/Menu";
const { params } = useRoute();

const [id] = params.id;

const { data: selectedMenu } = await useFetch<WeekMenu>(`/api/menu/${id}`);

const newMenu = reactive({
  name: selectedMenu.value?.name,
  dayMenus: selectedMenu.value?.dayMenus.map((dayMenu) => ({
    dayOfWeek: dayMenu.dayOfWeek,
    breakfast: {
      mainDish: dayMenu.breakfast.mainDish || { name: "", calories: 0 },
      side1: dayMenu.breakfast.side1 || { name: "", calories: 0 },
      side2: dayMenu.breakfast.side2 || { name: "", calories: 0 },
    },
    lunch: {
      mainDish: dayMenu.lunch.mainDish || { name: "", calories: 0 },
      side1: dayMenu.lunch.side1 || { name: "", calories: 0 },
      side2: dayMenu.lunch.side2 || { name: "", calories: 0 },
    },
    dinner: {
      mainDish: dayMenu.dinner.mainDish || { name: "", calories: 0 },
      side1: dayMenu.dinner.side1 || { name: "", calories: 0 },
      side2: dayMenu.dinner.side2 || { name: "", calories: 0 },
    },
  })),
  isActive: selectedMenu.value?.isActive,
  startDate: selectedMenu.value?.startDate,
  endDate: selectedMenu.value?.endDate,
});
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Actualizar menú" />

      <section class="mt-8">
        <!-- <h3 class="text-2xl">Menu {{ newMenu?.name }}</h3> -->

        <section
          class="grid max-w-6xl place-items-center gap-4 overflow-x-scroll pb-8 pt-4"
        >
          <Suspense>
            <template #fallback>
              <Icon name="svg-spinners:gooey-balls-2" size="32" />
            </template>
            <template #default>
              <Tabs :menu="newMenu" />
            </template>
          </Suspense>
          <!-- <UCard
            v-for="item in newMenu?.dayMenus"
            class="relative min-w-[12rem] py-4"
            :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
          >
            <img
              :src="background"
              class="absolute inset-0 z-0 h-full w-full rounded-xl object-cover"
            />
            <section class="relative z-10">
              <h3 class="text-center text-3xl font-bold text-white">
                {{ item.dayOfWeek }}
              </h3>
              <section class="flex flex-col gap-2">
                <Meal label="Desayuno" :item="item.breakfast" />
                <Meal label="Comida" :item="item.lunch" />
                <Meal label="Cena" :item="item.dinner" />
              </section>
            </section>
          </UCard> -->
        </section>
      </section>
    </UContainer>
  </main>
</template>
