<script setup lang="ts">
const { data: menu, pending } = await useFetch<WeeklyMenu>('/api/menu');

useHead({
  title: 'Menú de la semana | Heltifud Meal preps',
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
      content: 'Heltifud Meal preps',
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
  <MainSection :loading="pending">
    <template #heading>
      <AppHeading title="Menú de la semana" :description="menuDate" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="lg:hidden flex justify-center">
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
          :items="menu"
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
            <UCard class="w-full py-4 relative" :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }">
              <img :src="background" class="absolute w-full h-full object-cover inset-0 z-0" />
              <section class="relative z-10">
                <h3 class="text-3xl text-center font-bold">{{ item.day }}</h3>
                <section class="flex flex-col gap-4">
                  <Course label="Desayuno" :item="item.desayuno" />
                  <Course label="Comida" :item="item.comida" />
                  <Course label="Cena" :item="item.cena" />
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
    </template>
  </MainSection>
</template>
