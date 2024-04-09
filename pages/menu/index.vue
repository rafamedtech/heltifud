<script setup lang="ts">
const days = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1712690998/heltifud/15%20Abr%20-%2019%20Abr/Lunes_grxebb.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1712690997/heltifud/15%20Abr%20-%2019%20Abr/Martes_s7aq9c.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1712690997/heltifud/15%20Abr%20-%2019%20Abr/Miercoles_e8dbzm.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1712690997/heltifud/15%20Abr%20-%2019%20Abr/Jueves_qk4kqk.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1712690997/heltifud/15%20Abr%20-%2019%20Abr/Viernes_jw14sp.png',
];

const menu = computed(() => {
  return days;
});

const menuDate = computed(() => {
  return '15 Abril - 19 Abril';
});

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
      <AppHeading title="Menú de la próxima semana" :description="menuDate" />
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
          :items="menu"
          :ui="{
            item: 'basis-full',
            container: 'rounded-lg  mx-auto',
            indicators: {
              wrapper: 'relative bottom-0 mt-4 gap-2 max-w-full',
            },
          }"
          indicators
          :prev-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-left-20-solid',
            class: '-left-12',
          }"
          :next-button="{
            color: 'gray',
            icon: 'i-heroicons-arrow-right-20-solid',
            class: '-right-12',
          }"
          class="lg:w-[20rem] mx-auto"
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
