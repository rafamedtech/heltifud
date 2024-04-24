<script setup lang="ts">
const { data: menu } = await useFetch<WeeklyMenu>('/api/menu');

const menuDate = computed(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  if (currentMonth === 2) {
    // March is month 2 in JavaScript Date
    if (currentDay >= 13 && currentDay <= 19) {
      return '18 Marzo - 22 Marzo';
    } else if (currentDay >= 20 && currentDay <= 26) {
      return '25 Marzo - 29 Marzo';
    }
  }

  return '11 Marzo - 15 Marzo';
});

function indexName(index: number) {
  if (index === 1) return 'Lun';
  if (index === 2) return 'Mar';
  if (index === 3) return 'Mie';
  if (index === 4) return 'Jue';
  if (index === 5) return 'Vie';
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
      content: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
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
        <UButton label="Ordenar" size="lg" to="https://wa.me/c/5216648161284" class="bg-lima-500">
          <template #trailing><Icon name="heroicons:rocket-launch" size="24" /></template>
        </UButton>
      </section>
      <section class="mt-8 pb-8 px-2">
        <UCarousel
          :items="menu"
          :ui="{
            item: 'basis-full',
            container: 'rounded-lg  mx-auto',
            indicators: {
              wrapper: 'relative bottom-0 mt-4 max-w-full',
            },
          }"
          indicators
          class="lg:w-[20rem] mx-auto"
        >
          <template #default="{ item }">
            <UCard class="w-full pt-4 pb-8">
              <h3 class="text-3xl text-center font-bold">{{ item.day }}</h3>
              <section class="flex flex-col">
                <Course label="Desayuno" :item="item.desayuno" />
                <Course label="Comida" :item="item.comida" />
                <Course label="Cena" :item="item.cena" />
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
