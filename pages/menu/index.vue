<script setup lang="ts">
import type { DayWithMeals } from '~/types/Menu';

const { data: days } = await useFetch<DayWithMeals[]>('/api/menu');

const isLoading = ref(true);

onMounted(() => (isLoading.value = false));

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
      content: 'https://heltifud.com/',
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
      content:
        'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Menú de la próxima semana" description="18 Diciembre - 22 Diciembre" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="mt-8">
        <section class="grid gap-2 lg:grid-cols-5">
          <MenuCardContainer v-for="day in days" :day="day" />
        </section>
      </section>
    </template>
  </MainSection>
</template>
