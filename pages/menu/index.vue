<script setup lang="ts">
const { data: menu } = await useFetch<Menu>('/api/current-menu');
const weeklyMenu = menu.value?.weekMenus as WeeklyMenu;

useHead({
  title: 'Heltifud Meal preps | Menú de la semana',
  meta: [
    {
      name: 'description',
      content: 'Este es nuestro menú para la próxima semana.',
    },
    // Facebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://heltifud.com/menu',
    },
    {
      property: 'og:title',
      content: 'Heltifud Meal preps | Menú de la semana',
    },
    {
      property: 'og:description',
      content: 'Este es nuestro menú para la próxima semana.',
    },
    {
      property: 'og:image',
      content: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
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
        <UCarousel
          :items="weeklyMenu"
          :ui="{
            item: 'basis-full',
            container: 'rounded-xl  mx-auto',
            indicators: {
              wrapper: 'relative bottom-0 mt-4 max-w-full',
            },
          }"
          indicators
          class="lg:w-[20rem] mx-auto"
        >
          <template #default="{ item }">
            <UCard
              class="w-full py-4 relative max-h-[35rem]"
              :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
            >
              <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
              <section class="relative z-10 h-full">
                <h3 class="text-3xl text-center font-bold text-white capitalize">{{ item.dayOfWeek }}</h3>
                <section class="flex flex-col gap-4">
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
      </section>
    </UContainer>
  </main>
</template>
