<script setup lang="ts">
import background from '@/assets/img/background.jpg';

const { title, description, type } = defineProps<{
  title: string;
  description: string;
  type: string;
}>();
</script>

<template>
  <UModal
    prevent-close
    :ui="{
      wrapper: 'z-[999999]',
      overlay: { background: 'bg-gray-950/75 dark:bg-gray-950/75' },
      rounded: 'rounded-xl',
      width: `${type === 'plans' ? 'sm:max-w-6xl' : 'sm:max-w-lg'}`,
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-gray-100 dark:divide-gray-100',
        background: 'bg-white dark:bg-white',
        rounded: 'rounded-xl',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg text-primary-500">{{ title }}</h2>
          <UButton
            label="Cerrar"
            color="primary"
            icon="i-heroicons-arrow-left-on-rectangle-solid"
            size="md"
            class="-my-1"
            @click="useModal().close"
          />
        </div>
      </template>

      <div v-if="type === 'plans'">
        <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
          <div class="grid md:grid-cols-3 gap-8 max-w-full">
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

                <section class="hidden justify-between gap-4 flex-col mt-8">
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
      </div>

      <!-- <h3 class="text-primary mb-2 text-xl"></h3> -->
      <p v-if="type === 'delivery'" class="text-gray-950 text-lg">{{ description }}</p>
    </UCard>
  </UModal>
</template>
