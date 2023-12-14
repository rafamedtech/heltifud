<script setup lang="ts">
import type { Meal } from '@prisma/client';

defineProps<{
  title: string;
  course: Meal[];
}>();
</script>

<template>
  <li class="h-1/3">
    <h3 class="font-bold text-xl text-primary">{{ title }}</h3>
    <ul class="mt-2">
      <li v-for="meal in course">
        <ul class="flex flex-col gap-2">
          <li class="flex gap-2 justify-between w-full">
            <Icon name="icon-park-outline:arrow-right" class="text-primary" />
            <span class="w-2/3 block"> {{ meal.name }}</span>
            <span class="w-1/3 block text-end">{{ meal.calories }} Cal</span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>
