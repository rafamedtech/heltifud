<script setup lang="ts">
defineProps<{
  day: Day;
}>();
</script>

<template>
  <div>
    <MobileMenuCard :day="day" />

    <DesktopMenuCard :day="day" />
  </div>
</template>
