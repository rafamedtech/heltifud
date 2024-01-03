<script setup lang="ts">
import type { Course } from '@/types/Menu';

const {
  title,
  course,
  color = 'dark',
} = defineProps<{
  title: string;
  course: Course;
  color?: string;
}>();
</script>

<template>
  <li
    class="h-1/3"
    :class="{ 'text-gray-300': color === 'light', 'text-gray-950': color === 'dark' }"
  >
    <h3 class="text-2xl lg:text-lg text-primary">{{ title }}</h3>
    <ul class="mt-2">
      <li v-for="meal in course">
        <ul class="flex flex-col gap-2">
          <li class="flex gap-2 justify-between w-full lg:text-sm text-lg">
            <Icon name="icon-park-outline:arrow-right" />
            <span class="w-2/3 block"> {{ meal.name }}</span>
            <span class="w-1/4 block text-end">{{ meal.calories }} Cal</span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>
