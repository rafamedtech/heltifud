<script setup lang="ts">
const menuBackup1 = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262707/heltifud/18%20Mar%20-%2022%20Mar/Lunes_ucp302.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262708/heltifud/18%20Mar%20-%2022%20Mar/Martes_gk6jpk.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262709/heltifud/18%20Mar%20-%2022%20Mar/Miercoles_gsmbac.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262706/heltifud/18%20Mar%20-%2022%20Mar/Jueves_gf49ms.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262710/heltifud/18%20Mar%20-%2022%20Mar/Viernes_mj9my6.png',
];

const menuBackup2 = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262907/heltifud/25%20Mar%20-%2029%20Mar/Lunes_ba59rx.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262904/heltifud/25%20Mar%20-%2029%20Mar/Martes_qxar3n.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262908/heltifud/25%20Mar%20-%2029%20Mar/Miercoles_n9hu4n.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262903/heltifud/25%20Mar%20-%2029%20Mar/Jueves_oel5v2.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1710262905/heltifud/25%20Mar%20-%2029%20Mar/Viernes_sgihsf.png',
];

const days = [
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1711662400/heltifud/1%20Abr%20-%205%20Abr/Lunes_zehw8b.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1711662400/heltifud/1%20Abr%20-%205%20Abr/Martes_gg3yk7.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1711662401/heltifud/1%20Abr%20-%205%20Abr/Miercoles_s2ojxi.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1711662400/heltifud/1%20Abr%20-%205%20Abr/Jueves_lgb0d6.png',
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1711662402/heltifud/1%20Abr%20-%205%20Abr/Viernes_giqwdn.png',
];

const menu = computed(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  if (currentMonth === 2) {
    // March is month 2 in JavaScript Date
    if (currentDay >= 13 && currentDay <= 19) {
      return menuBackup1;
    } else if (currentDay >= 20 && currentDay <= 26) {
      return menuBackup2;
    }
  }

  return days;
});

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
