<script setup lang="ts">
import type { WeekMenu } from '@/types/Menu';

const { data: menu } = await useFetch<WeekMenu>('/api/current-menu');
const weeklyMenu = menu.value?.dayMenus;

useSeoMeta({
  title: 'Heltifud Meal preps | Menú de la semana',
  description: 'Este es nuestro menú para la próxima semana.',
  ogDescription: 'Este es nuestro menú para la próxima semana.',
  ogImage: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
  ogTitle: 'Heltifud Meal preps | Menú de la semana',
});
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading
        title="Menú de la semana"
        :description="`${formatDate(menu.startDate)} - ${formatDate(menu.endDate)}`"
      />
      <section class="lg:hidden flex justify-center mt-8">
        <UButton
          label="Ordenar"
          size="lg"
          trailing-icon="i-heroicons-rocket-launch"
          to="https://wa.me/c/5216648161284"
          target="_blank"
        />
      </section>
      <section class="mt-8 pb-8 px-2">
        <Suspense>
          <template #default>
            <UCarousel
              :items="weeklyMenu"
              :ui="{
                item: 'basis-full ',
                container: 'rounded-xl min-h-[35rem] max-h-[35rem] h-full h-fit mx-auto',
                indicators: {
                  wrapper: 'relative bottom-0 mt-4 max-w-full',
                },
              }"
              indicators
              class="lg:w-[20rem] mx-auto"
            >
              <template #default="{ item }">
                <UCard
                  class="w-full py-4 relative h-full min-h-full"
                  :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
                >
                  <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
                  <section class="relative z-10 min-h-full">
                    <h3 class="text-3xl text-center font-bold text-white capitalize">{{ item.dayOfWeek }}</h3>
                    <section class="flex flex-col gap-2">
                      <Course label="Desayuno" :item="item.breakfast" />
                      <Course label="Comida" :item="item.lunch" />
                      <Course label="Cena" :item="item.dinner" />
                    </section>
                  </section>
                </UCard>
              </template>

              <template #indicator="{ onClick, page, active }">
                <UButton
                  :label="indexName(page)"
                  :variant="active ? 'solid' : 'outline'"
                  size="sm"
                  class="rounded-xl min-w-6 justify-center"
                  :color="active ? 'primary' : 'gray'"
                  @click="onClick(page)"
                />
              </template>
            </UCarousel>
          </template>

          <template #fallback>Loading...</template>
        </Suspense>
      </section>
    </UContainer>
  </main>
</template>
