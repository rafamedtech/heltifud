<script setup lang="ts">
import deliveryTruck from '@/assets/img/deliverytruck.svg';
import comodidad from '@/assets/img/benefits/comodidad.svg';
import salud from '@/assets/img/benefits/salud.svg';
import variedad from '@/assets/img/benefits/variedad.svg';
import personalizacion from '@/assets/img/benefits/personalizacion.svg';
const isLoading = ref(true);

const { steps } = useSteps();

const benefits = [
  {
    title: 'Comodidad',
    description: 'Olvídate de las compras y el tiempo en la cocina. Nosotros lo hacemos por ti.',
    img: comodidad,
  },
  {
    title: 'Salud',
    description: 'Menús diseñados para mantener una dieta equilibrada y nutritiva.',
    img: salud,
  },
  {
    title: 'Variedad',
    description: 'Nuevos menús cada semana para mantener tu dieta interesante y deliciosa.',
    img: variedad,
  },
  {
    title: 'Personalización',
    description: 'Adapta tus comidas a tus necesidades y preferencias.',
    img: personalizacion,
  },
];

onMounted(() => (isLoading.value = false));

useHead({
  title: 'Heltifud Meal preps | Inicio',
  meta: [
    {
      name: 'description',
      content: 'Servicio de comidas saludables y caseras a domicilio.',
    },
    // Facebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://heltifud.com',
    },
    {
      property: 'og:title',
      content: 'Heltifud Meal preps | Inicio',
    },
    {
      property: 'og:description',
      content: 'Servicio de comidas saludables y caseras a domicilio',
    },
    {
      property: 'og:image',
      content: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});
</script>

<template>
  <main class="min-h-screen">
    <section
      class="hero mx-auto relative h-[60vh] flex px-5 py-14 items-center justify-center flex-col md:flex-row-reverse"
    >
      <UContainer class="text-center z-10 md:text-left w-full" :ui="{ constrained: 'max-w-6xl' }">
        <section class="lg:w-2/3">
          <h1 class="sm:text-4xl lg:text-5xl text-3xl mb-4 font-semibold text-primary-500">
            ¡Comidas saludables, directo a tu puerta!
          </h1>
          <p class="mb-8 leading-relaxed text-lg lg:text-xl text-white">
            Transforma tu alimentación con comidas caseras, equilibradas y deliciosas, sin complicaciones.
          </p>
        </section>

        <div class="flex justify-center md:justify-start">
          <UButton
            label="Ver planes"
            size="xl"
            to="/nuestros-planes"
            class="bg-primary-500"
            icon="i-heroicons-list-bullet-20-solid"
            trailing
          />
        </div>
      </UContainer>
    </section>

    <UContainer as="section" class="pt-8" :ui="{ constrained: 'max-w-6xl' }">
      <article>
        <h2 class="text-primary-500 text-3xl">¿Por qué elegirnos?</h2>
      </article>
      <section class="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 justify-between">
        <UCard v-for="benefit in benefits" :ui="{ rounded: 'rounded-xl' }">
          <section class="flex flex-col gap-2">
            <!-- <img :src="benefit.img" :alt="benefit.title" class="h-40" /> -->
            <figure class="w-56 h-56 mx-auto">
              <img :src="benefit.img" :alt="benefit.title" class="w-full h-full" />
            </figure>
            <h3 class="text-primary text-2xl">{{ benefit.title }}</h3>
            <p class="text-lg">{{ benefit.description }}</p>
          </section>
        </UCard>
      </section>
      <!-- <article class="pb-2 md:flex flex-col md:gap-8 md:items-center md:py-24">
        <h2 class="text-primary-500 text-3xl">¿Por qué elegirnos?</h2>
      </article> -->

      <article class="pt-8">
        <h2 class="text-primary-500 text-3xl">¿Cómo funciona el servicio?</h2>
        <p class="lg:w-1/2 pt-2 text-lg">
          Para recibir tus meal preps a la puerta de tu hogar sólo sigue los siguientes pasos:
        </p>
      </article>

      <section>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 justify-between">
          <StepCard v-for="step in steps" :step="step" :key="step.title" />
        </div>
      </section>
    </UContainer>

    <section
      class="hero mx-auto relative h-[60vh] flex px-5 mt-12 py-14 items-center justify-center flex-col md:flex-row-reverse"
    >
      <div class="text-center relative z-10 lg:w-2/3 w-full">
        <h2 class="sm:text-4xl lg:text-5xl text-3xl mb-4 font-semibold text-primary-500">
          Recibe 15% de descuento en tu primer pedido
        </h2>
        <p class="mb-8 leading-relaxed text-lg lg:text-xl text-white">
          Además, recibe un regalo sorpresa en tu primer pedido.
        </p>

        <div class="flex justify-center">
          <UButton label="Ordenar por WhatsApp" icon="i-heroicons-rocket-launch" to="/ordenar" size="xl" trailing />
        </div>
      </div>
    </section>
  </main>
</template>
