<script setup lang="ts">
import type { Dish } from "@prisma/client";
import type { DayMenu } from "@/types/Menu";

interface Props {
  dayMenus: DayMenu[];
  dishes?: Dish[] | null;
}

const { dayMenus, dishes } = defineProps<Props>();

const breakfasts = computed(() =>
  dishes?.filter((dish) => dish.type === "BREAKFAST"),
);

const lunches = computed(() => dishes?.filter((dish) => dish.type === "LUNCH"));

const dinners = computed(() =>
  dishes?.filter((dish) => dish.type === "DINNER"),
);
const sides = computed(() => dishes?.filter((dish) => dish.type === "SIDE"));

const items = dayMenus.map((dayMenu: any) => ({
  label: dayMenu.dayOfWeek,
  key: dayMenu.dayOfWeek,
  ...dayMenu,
}));
</script>

<template>
  <UTabs :items="items" class="w-full min-w-full max-w-2xl md:min-w-0">
    <template #item="{ item }">
      <UCard class="w-full">
        <Meal
          label="Desayuno"
          :item="item.breakfast"
          :dishes="breakfasts"
          :sides="sides"
        />
        <Meal
          label="Comida"
          :item="item.lunch"
          :dishes="lunches"
          :sides="sides"
        />
        <Meal
          label="Cena"
          :item="item.dinner"
          :dishes="dinners"
          :sides="sides"
        />
      </UCard>
    </template>
  </UTabs>
</template>
