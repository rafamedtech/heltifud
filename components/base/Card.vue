<script setup lang="ts">
const { title, description, cover } = defineProps<{
  title?: string;
  description?: string;
  cover?: string;
}>();
</script>

<template>
  <div class="h-full card relative min-h-[10rem] lg:h-[15rem] lg:hover:scale-105 transition-all">
    <img
      v-if="cover"
      :src="cover"
      alt=""
      class="absolute h-full w-full object-cover z-10 inset-0 brightness-50 rounded-lg"
    />
    <section
      class="z-50 relative h-full p-4"
      :class="{ 'min-h-[10rem] grid place-content-center': cover }"
    >
      <h3
        class="card-title text-accent dark:text-primary text-2xl w-fit"
        :class="{ 'p-2 rounded-lg bg-accent/20 dark:bg-primary/10 shadow-sm': cover }"
      >
        {{ title }}
      </h3>
      <span v-if="description" class="dark:text-base-100">{{ description }}</span>
    </section>
  </div>
</template>
