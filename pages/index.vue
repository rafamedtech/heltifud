<script setup lang="ts">
import deliveryTruck from '@/assets/img/deliverytruck.svg';
const isLoading = ref(true);

const { steps } = useSteps();

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
  <main class="min-h-screen">
    <section
      class="hero mx-auto relative h-[60vh] flex px-5 py-14 items-center justify-center flex-col md:flex-row-reverse"
    >
      <UContainer class="text-center z-10 md:text-left w-full" :ui="{ constrained: 'max-w-6xl' }">
        <section class="lg:w-2/3">
          <h1 class="sm:text-4xl lg:text-5xl text-3xl mb-4 font-semibold text-primary-500">
            Donde lo saludable se encuentra con lo delicioso
          </h1>
          <p class="mb-8 leading-relaxed text-lg lg:text-xl text-white">
            Recibe tus comidas para toda la semana en la comodidad de tu hogar.
          </p>
        </section>

        <div class="flex justify-center md:justify-start">
          <UButton
            label="Ver planes"
            size="lg"
            to="/nuestros-planes"
            class="bg-primary-500"
            icon="i-heroicons-list-bullet-20-solid"
          />
        </div>
      </UContainer>
    </section>

    <UContainer as="section" class="pt-8" :ui="{ constrained: 'max-w-6xl' }">
      <article class="pb-8 md:flex md:gap-8 md:items-center md:py-24">
        <div>
          <h2 class="text-primary-500 text-3xl">¿Qué es Heltifud Meal preps?</h2>
          <p class="pt-2 text-lg">
            Somos un servicio que ofrece comidas saludables y caseras. Todos nuestros platillos están preparados con
            ingredientes frescos y pensados para apoyar un estilo de vida saludable.
          </p>
        </div>
        <img :src="deliveryTruck" alt="" class="md:w-1/2 pt-8 md:pt-0 mx-auto" />
      </article>
      <article class="pt-8">
        <h2 class="text-primary-500 text-3xl">¿Cómo funciona el servicio?</h2>
        <p class="lg:w-1/2 pt-2 text-lg">
          Nuestro servicio es muy sencillo, solo sigue estos pasos y recibe tus comidas en la comodidad de tu hogar.
        </p>
      </article>

      <section>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-8">
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
          <UButton label="Ordenar" icon="i-heroicons-rocket-launch" to="/ordenar" size="lg" />
        </div>
      </div>
    </section>
  </main>
</template>
