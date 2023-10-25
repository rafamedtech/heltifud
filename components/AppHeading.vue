<script setup lang="ts">
interface Props {
  title: String;
  description?: String;
}

defineProps<Props>();
</script>

<template>
  <section>
    <h1 class="text-[40px] text-primary mb-3">{{ title }}</h1>
    <span class="text-base-100">{{ description }}</span>
  </section>
</template>
