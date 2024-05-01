<script setup lang="ts">
import background from '@/assets/img/background.jpg';

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading
        title="Nuestros planes"
        description="Contamos con planes sencillos pero también flexibles para toda la semana"
      />
    </template>

    <template #content>
      <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="{ title, description, prices } in plans"
            :ui="{
              header: { padding: 'py-0 px-0 sm:p-0' },
              body: { base: 'min-h-full ' },
            }"
            class="relative flex-col justify-center rounded-2xl"
          >
            <img :src="background" class="absolute w-full h-full object-cover rounded-2xl inset-0 z-0" />

            <section class="min-h-full flex flex-col justify-between lg:h-[20rem]">
              <div>
                <h3 class="text-2xl font-bold text-primary-500 z-50 relative">{{ title }}</h3>
                <section class="z-50 relative">
                  <p class="text-gray-300">
                    {{ description }}
                  </p>
                  <section class="mt-8 lg:mt-16 flex flex-col justify-center items-center">
                    <div v-for="{ name, price } in prices" class="flex text-gray-300 gap-4 justify-around">
                      <span class="text-xl">{{ name }}:</span>
                      <span class="text-xl text-primary font-bold">${{ price }}</span>
                    </div>
                  </section>
                </section>
              </div>

              <section class="flex justify-between gap-4 flex-col mt-8">
                <UButton
                  label="Ordenar"
                  size="lg"
                  class="justify-center w-full mx-auto text-lg z-10"
                  color="primary"
                  to="https://wa.me/c/5216648161284"
                >
                  <template #trailing>
                    <Icon name="heroicons:rocket-launch" size="24" />
                  </template>
                </UButton>
              </section>
            </section>
          </UCard>
        </div>
      </UContainer>
    </template>
  </MainSection>
</template>
