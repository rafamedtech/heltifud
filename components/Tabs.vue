<script setup lang="ts">
import type { WeekMenu } from "@/types/Menu";

interface Props {
  menu: any;
}

const { menu } = defineProps<Props>();

const items = menu.dayMenus.map((dayMenu: any) => ({
  label: dayMenu.dayOfWeek,
  key: dayMenu.dayOfWeek,
  ...dayMenu,
}));
</script>

<template>
  <UTabs :items="items">
    <template #item="{ item }">
      <UCard>
        <Meal label="Desayuno" :item="item.breakfast" />
        <Meal label="Comida" :item="item.lunch" />
        <Meal label="Cena" :item="item.dinner" />
      </UCard>
    </template>
  </UTabs>
</template>
