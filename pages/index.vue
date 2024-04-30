<script setup lang="ts">
import hero from '@/assets/img/hero.jpeg';

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
  <main class="bg-gray-50 min-h-screen">
    <section class="">
      <div class="container mx-auto h-[60vh] flex px-5 py-14 items-center justify-center flex-col md:flex-row-reverse">
        <img
          class="absolute top-0 pt-16 right-0 bottom-0 left-0 object-cover w-full lg:rotate-[270deg] lg:w-full z-0 brightness-50"
          alt="hero"
          :src="hero"
        />
        <!-- <img class="lg:w-3/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" :src="hero" /> -->

        <div class="text-center relative z-10 md:text-left lg:w-2/3 w-full">
          <h1 class="sm:text-4xl text-3xl mb-4 font-semibold">Donde lo saludable se encuentra con lo delicioso</h1>
          <p class="mb-8 leading-relaxed">Recibe tus comidas para toda la semana en la comodidad de tu hogar.</p>
          <div class="flex justify-center md:justify-start">
            <UButton label="Ver planes" size="lg" to="https://wa.me/c/5216648161284" class="bg-lima-500">
              <template #trailing>
                <Icon name="heroicons:rocket-launch" size="24" />
              </template>
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
