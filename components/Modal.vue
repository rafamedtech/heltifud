<script setup lang="ts">
// import background from '@/assets/img/background.jpg';

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
        background: 'bg-white dark:bg-dark',
        rounded: 'rounded-xl',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-xl text-primary-500 lg:text-2xl">{{ title }}</h2>
          <UButton
            label="Regresar"
            color="gray"
            variant="outline"
            icon="i-heroicons-arrow-left-on-rectangle-solid"
            size="md"
            class="-my-1"
            @click="useModal().close"
          />
        </div>
      </template>

      <div v-if="type === 'plans'">
        <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl', padding: 'py-0 px-0 sm:p-0' }">
          <section class="md:grid hidden md:grid-cols-4 gap-8 max-w-full">
            <UCard
              v-for="{ title, description, prices, cover } in plans"
              :ui="{
                header: { padding: 'py-0 px-0 sm:p-0' },
                body: { base: 'min-h-full ' },
                rounded: 'rounded-xl',
              }"
              class="relative flex-col justify-center"
            >
              <img :src="cover" class="absolute w-full h-full object-cover rounded-xl inset-0 z-0 brightness-[.40]" />

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
              </section>
            </UCard>
          </section>

          <section class="md:hidden">
            <UCarousel
              :items="plans"
              :ui="{
                item: 'basis-full',
                container: 'rounded-xl  mx-auto',
                indicators: {
                  wrapper: 'relative bottom-0 mt-4 max-w-full',
                },
              }"
              indicators
            >
              <template #default="{ item }">
                <UCard class="w-full py-4 relative" :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }">
                  <img
                    :src="item.cover"
                    class="absolute w-full h-full object-cover rounded-xl inset-0 z-0 brightness-[.40]"
                  />

                  <section class="min-h-full flex flex-col justify-between lg:h-[20rem]">
                    <div>
                      <h3 class="text-2xl font-bold text-primary-500 z-50 relative">{{ item.title }}</h3>
                      <section class="z-50 relative">
                        <p class="text-gray-300">
                          {{ item.description }}
                        </p>
                        <section class="mt-8 lg:mt-16 flex flex-col justify-center items-center">
                          <div v-for="{ name, price } in item.prices" class="flex text-gray-300 gap-4 justify-around">
                            <span class="text-xl">{{ name }}:</span>
                            <span class="text-xl text-primary font-bold">${{ price }}</span>
                          </div>
                        </section>
                      </section>
                    </div>
                  </section>
                </UCard>
              </template>

              <template #indicator="{ onClick, page, active }">
                <UButton
                  :label="indexPlans(page)"
                  :variant="active ? 'solid' : 'outline'"
                  size="sm"
                  class="rounded-xl min-w-6 justify-center"
                  :color="active ? 'primary' : 'gray'"
                  @click="onClick(page)"
                />
              </template>
            </UCarousel>
          </section>

          <section class="mt-8">
            <UCard :ui="{ background: 'dark:bg-gray-950' }">
              <template #header>
                <h2 class="text-3xl text-primary-500">¿Tienes dieta de tu nutriólo(a)?</h2>
              </template>
              <p class="pt-2 text-lg">
                Si tienes una dieta especial de tu nutriólogo(a) y quieres seguirla, contáctanos para que podamos
                adaptarla a nuestros planes.
              </p>

              <section class="mt-8 flex justify-center">
                <UButton
                  label="Contactar"
                  icon="i-heroicons-device-phone-mobile"
                  size="xl"
                  color="primary"
                  to="https://wa.me/c/5216648161284"
                  class="justify-center"
                />
              </section>
            </UCard>
          </section>
        </UContainer>
      </div>

      <!-- <h3 class="text-primary mb-2 text-xl"></h3> -->
      <p v-if="type === 'delivery'" class="text-lg">{{ description }}</p>
    </UCard>
  </UModal>
</template>
