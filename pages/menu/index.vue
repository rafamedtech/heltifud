<script setup lang="ts">
import type { DayWithMeals, Course } from '@/types/Menu';
import background from '@/assets/img/background.jpg';

// const { data: days } = await useFetch<DayWithMeals[]>('/api/menu');

// const items = days.value?.map((day: DayWithMeals) => ({
//   label: day.name,
// }));

// const getMealtypeByDay = (dayName: string, type: string): Course => {
//   const day = days.value?.find((day: DayWithMeals) => day.name === dayName);
//   return type === 'breakfast' ? day?.breakfast : type === 'lunch' ? day?.lunch : day?.dinner || [];
// };

const items = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706824838/heltifud/5%20Feb%20-%209%20Feb/Lunes_tdob8u.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706824838/heltifud/5%20Feb%20-%209%20Feb/Martes_orhgif.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706824839/heltifud/5%20Feb%20-%209%20Feb/Miercoles_bgblmq.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706824838/heltifud/5%20Feb%20-%209%20Feb/Jueves_gw4zjx.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1706824839/heltifud/5%20Feb%20-%209%20Feb/Viernes_uagrut.png',
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
      <AppHeading title="Menú de la próxima semana" description="5 Febrero - 9 Febrero" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="lg:hidden flex justify-center">
        <UButton label="Ordenar" size="lg" to="https://wa.me/c/5216648161284">
          <template #trailing><Icon name="heroicons:rocket-launch" size="24" /></template>
        </UButton>
      </section>
      <section class="mt-8 pb-8">
        <!-- <section class="grid gap-2 lg:grid-cols-5">
          <UAccordion
            class="lg:hidden"
            color="black"
            :items="items"
            size="xl"
            :ui="{
              default: {
                class: 'py-6 shadow mb-1.5 w-full text-2xl text-primary hover:bg-gray-950',
                variant: 'solid',
              },
            }"
          >
            <template #item="{ item }">
              <ul class="px-2 mb-2">
                <MealCourse title="Desayuno" :course="getMealtypeByDay(item.label, 'breakfast')" />
                <MealCourse title="Comida" :course="getMealtypeByDay(item.label, 'lunch')" />
                <MealCourse title="Cena" :course="getMealtypeByDay(item.label, 'dinner')" />
              </ul>
            </template>
          </UAccordion>

          <UCard
            v-for="day in days"
            class="hidden lg:block relative"
            :ui="{
              base: 'overflow-hidden',
              background: 'bg-white dark:bg-white',
              body: { base: 'min-h-[35rem] max-h-[35rem] h-full text-sm', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <h3 class="text-2xl text-gray-300 z-10 relative py-2">{{ day.name }}</h3>
            <img :src="background" alt="" class="absolute w-full h-full object-cover inset-0 z-0" />
            <ul class="h-full z-10 relative text-gray-300">
              <MealCourse title="Desayuno" :course="getMealtypeByDay(day.name, 'breakfast')" />
              <MealCourse title="Comida" :course="getMealtypeByDay(day.name, 'lunch')" />
              <MealCourse title="Cena" :course="getMealtypeByDay(day.name, 'dinner')" />
            </ul>
          </UCard>
        </section> -->
        <UCarousel
          :items="items"
          :ui="{
            item: 'basis-full',
            container: 'rounded-lg',
            indicators: {
              wrapper: 'relative bottom-0 mt-4',
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
