<script setup lang="ts">
const { item } = defineProps<{
  label: string;
  item: Meal;
}>();
</script>

<template>
  <section class="pt-4 justify-between flex flex-col h-full">
    <h4 class="text-lima-500 text-xl">{{ label }}</h4>
    <div class="flex gap-2 justify-between items-center">
      <span>{{ item.main.name }}</span>
      <span>{{ Number(item.main.calories).toFixed(0) }}Cal</span>
    </div>
    <div class="flex gap-2 justify-between items-center" v-if="item.side1.name">
      <span>{{ item.side1.name }}</span>
      <span>{{ Number(item.side1.calories).toFixed(0) }}Cal</span>
    </div>
    <div class="flex gap-2 justify-between items-center" v-if="item.side2.name">
      <span>{{ item.side2.name }}</span>
      <span>{{ Number(item.side2.calories).toFixed(0) }}Cal</span>
    </div>
  </section>
</template>
