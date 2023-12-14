<script setup lang="ts">
interface Props {
  title: String;
  description?: String;
}

defineProps<Props>();
</script>

<template>
  <section class="px-2">
    <h1 class="text-[40px] text-primary mb-3">{{ title }}</h1>
    <span class="text-base-300">{{ description }}</span>
  </section>
</template>
