<script setup lang="ts">
const { item } = defineProps<{
  label: string;
  item: Meal;
}>();
</script>

<template>
  <section class="pt-4 w-full h-full">
    <h4 class="text-primary-500 text-xl text-center">{{ label }}</h4>
    <section class="grid grid-rows-3 pt-4 text-white text-lg lg:text-base">
      <div class="flex gap-2 justify-between items-center h-1/3">
        <span class="">{{ item.mainDish.name }}</span>
        <span>{{ Number(item.mainDish.calories).toFixed(0) }}Cal</span>
      </div>
      <div class="flex gap-2 justify-between items-center h-1/3" v-if="item.side1?.name">
        <span class="">{{ item.side1?.name }}</span>
        <span>{{ Number(item.side1?.calories).toFixed(0) }}Cal</span>
      </div>
      <div class="flex gap-2 justify-between items-center h-1/3" v-if="item.side2?.name">
        <span class="">{{ item.side2?.name }}</span>
        <span>{{ Number(item.side2?.calories).toFixed(0) }}Cal</span>
      </div>
    </section>
  </section>
</template>
