<script setup lang="ts">
import type { DayWithMeals } from '@/types/Menu';

defineProps<{
  day: DayWithMeals;
}>();
</script>

<template>
  <div class="px-2 lg:px-0">
    <MobileMenuCard :day="day" />

    <DesktopMenuCard :day="day" />
  </div>
</template>
