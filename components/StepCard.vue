<script setup lang="ts">
const { step } = defineProps<{ step: Step }>();

const { title, description, image, button } = step;
</script>

<template>
  <UCard
    class="text-white"
    :ui="{
      rounded: 'rounded-xl',
      background: 'bg-white dark:bg-dark',
    }"
    :key="title"
  >
    <template #header>
      <h3 class="text-xl text-primary-500">{{ title }}</h3>
    </template>

    <figure class="w-56 h-56 mx-auto">
      <img :src="image" :alt="title" class="w-full h-full" />
    </figure>
    <p class="text-lg text-dark dark:text-gray-50">{{ description }}</p>

    <template #footer>
      <section class="flex items-center justify-center">
        <UButton :label="button.label" size="xl" :icon="button.icon" @click="button.click" />
      </section>
    </template>
  </UCard>
</template>
