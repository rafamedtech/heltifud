<script setup lang="ts">
interface Props {
  title: String;
  price: String | number;
  image: String;
  link: String;
  description: String;
  collection?: String;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink :to="(link as string)" class="w-64">
    <!-- <NuxtLink :to="(link as string)" class="lg:w-1/4 md:w-1/2 p-4 w-full"> -->
    <figure class="block relative h-48 w-full rounded overflow-hidden">
      <img
        alt="ecommerce"
        class="object-cover object-center w-full h-full block"
        :src="(image as string)"
      />
    </figure>
    <div class="mt-4">
      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{ collection }}</h3>
      <h2 class="title-font text-lg font-bold">{{ title }}</h2>
      <!-- <p class="mt-1">${{ price }}</p> -->
    </div>
  </NuxtLink>
</template>
