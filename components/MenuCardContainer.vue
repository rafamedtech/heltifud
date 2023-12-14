<script setup lang="ts">
import type { DayWithMeals } from '@/types/Menu';

defineProps<{
  day: DayWithMeals;
}>();
</script>

<template>
  <div>
    <MobileMenuCard :day="day" />

    <DesktopMenuCard :day="day" />
  </div>
</template>
