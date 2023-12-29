<script setup lang="ts">
import { plans } from '@/utils/products';

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Nuestros planes" />
    </template>

    <template #content>
      <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="{ title, cover, description, prices } in plans"
            :ui="{ header: { padding: 'py-0 px-0 sm:p-0' } }"
          >
            <template #header>
              <section class="relative flex justify-center items-center h-40">
                <img
                  :src="cover"
                  alt=""
                  class="brightness-50 h-full w-full object-cover z-0 absolute"
                />
                <h3 class="text-2xl font-bold text-primary-500 z-50 relative">{{ title }}</h3>
              </section>
            </template>

            <div class="h-[12rem]">
              <section class="z-50 relative">
                <p class="text-gray-500">
                  {{ description }}
                </p>
                <section class="mt-8 flex flex-col items-center">
                  <div v-for="{ name, price } in prices" class="flex gap-4 justify-around">
                    <span class="text-xl text-primary">{{ name }}:</span>
                    <span class="text-xl font-bold">${{ price }}</span>
                  </div>
                </section>
              </section>
            </div>
          </UCard>
        </div>
      </UContainer>
    </template>
  </MainSection>
</template>
