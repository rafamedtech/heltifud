<script setup lang="ts">
interface Props {
  title: String;
  description?: String;
}

defineProps<Props>();
</script>

<template>
  <section class="px-2 lg:px-0">
    <h1 class="text-[40px] text-lima-500 mb-3 leading-tight">{{ title }}</h1>
    <span class="text-base-300">{{ description }}</span>
  </section>
</template>
