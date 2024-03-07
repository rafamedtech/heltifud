<script setup lang="ts">
// import type { DayWithMeals, Course } from '@/types/Menu';
// import background from '@/assets/img/background.jpg';

// const { data: days } = await useFetch<DayWithMeals[]>('/api/menu');

// const items = days.value?.map((day: DayWithMeals) => ({
//   label: day.name,
// }));

// const getMealtypeByDay = (dayName: string, type: string): Course => {
//   const day = days.value?.find((day: DayWithMeals) => day.name === dayName);
//   return type === 'breakfast' ? day?.breakfast : type === 'lunch' ? day?.lunch : day?.dinner || [];
// };

const days = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1709852532/heltifud/11%20Mar%20-%2015%20Mar/Lunes_tvvwvv.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1709852532/heltifud/11%20Mar%20-%2015%20Mar/Martes_hxq409.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1709852532/heltifud/11%20Mar%20-%2015%20Mar/Miercoles_ayyfgo.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1709852532/heltifud/11%20Mar%20-%2015%20Mar/Jueves_swg7r0.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1709852533/heltifud/11%20Mar%20-%2015%20Mar/Viernes_sfozto.png',
];

function indexName(index: number) {
  if (index === 1) return 'Lunes';
  if (index === 2) return 'Martes';
  if (index === 3) return 'Miércoles';
  if (index === 4) return 'Jueves';
  if (index === 5) return 'Viernes';
}

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
      <AppHeading title="Menú de la próxima semana" description="4 Marzo - 8 Marzo" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="lg:hidden flex justify-center">
        <UButton label="Ordenar" size="lg" to="https://wa.me/c/5216648161284">
          <template #trailing><Icon name="heroicons:rocket-launch" size="24" /></template>
        </UButton>
      </section>
      <section class="mt-8 pb-8">
        <UCarousel
          :items="days"
          :ui="{
            item: 'basis-full',
            container: 'rounded-lg',
            indicators: {
              wrapper: 'relative bottom-0 mt-4 gap-2 max-w-full',
            },
          }"
          indicators
          class="min-w-full max-w-screen-md mx-auto"
        >
          <template #default="{ item }">
            <img :src="item" class="w-full rounded-xl" draggable="false" />
          </template>

          <template #indicator="{ onClick, index, active }">
            <UButton
              :label="indexName(index)"
              :variant="active ? 'solid' : 'outline'"
              size="sm"
              class="rounded-xl min-w-6 justify-center"
              :color="active ? 'primary' : 'gray'"
              @click="onClick(index)"
            />
          </template>
        </UCarousel>
      </section>
    </template>
  </MainSection>
</template>
