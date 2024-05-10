<script setup lang="ts">
import background from '@/assets/img/background.jpg';

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});

useHead({
  title: 'Heltifud Meal preps | Todos nuestros planes',
  meta: [
    {
      name: 'description',
      content: 'Conoce todos nuestros planes y elige el que más se adapte a tus necesidades.',
    },
    // Facebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://heltifud.com/nuestros-planes',
    },
    {
      property: 'og:title',
      content: 'Heltifud Meal preps | Todos nuestros planes',
    },
    {
      property: 'og:description',
      content: 'Conoce todos nuestros planes y elige el que más se adapte a tus necesidades.',
    },
    {
      property: 'og:image',
      content: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading
        title="Nuestros planes"
        description="Contamos con planes sencillos pero también flexibles para toda la semana"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <UCard
          v-for="{ title, description, prices, cover, link } in plans"
          :ui="{
            header: { padding: 'py-0 px-0 sm:p-0' },
            body: { base: 'min-h-full ' },
            rounded: 'rounded-xl',
          }"
          class="relative flex-col justify-center"
        >
          <img :src="cover" class="absolute w-full h-full object-cover rounded-xl inset-0 z-0 brightness-[0.40]" />

          <section class="min-h-full flex flex-col justify-between lg:h-[20rem]">
            <div>
              <h3 class="text-2xl font-bold text-primary-500 z-50 relative">{{ title }}</h3>
              <section class="z-50 relative">
                <p class="text-gray-300">
                  {{ description }}
                </p>
                <section class="mt-8 lg:mt-16 flex flex-col justify-center items-center">
                  <div v-for="{ name, price } in prices" class="flex text-gray-300 gap-4 justify-around">
                    <span class="text-xl">{{ name }}:</span>
                    <span class="text-xl text-primary font-bold">${{ price }}</span>
                  </div>
                </section>
              </section>
            </div>

            <section class="flex justify-between gap-4 flex-col mt-8">
              <UButton
                label="Ordenar por WhatsApp"
                icon="i-heroicons-device-phone-mobile"
                trailing
                size="lg"
                class="justify-center w-fit text-lg md:text-sm md:w-full mx-auto z-10"
                color="primary"
                :to="link"
              >
              </UButton>
            </section>
          </section>
        </UCard>
      </div>

      <section class="mt-8">
        <UCard :ui="{ background: 'dark:bg-gray-950', rounded: 'rounded-xl' }">
          <template #header>
            <h2 class="text-3xl text-primary-500">¿Tienes dieta de tu nutriólogo(a)?</h2>
          </template>
          <p class="pt-2 text-lg">
            Si tienes una dieta especial de tu nutriólogo(a) y quieres seguirla, contáctanos para que podamos adaptarla
            a nuestros planes.
          </p>

          <section class="mt-8 flex justify-center">
            <!-- <UButton
              label="Contactar"
              icon="i-heroicons-device-phone-mobile"
              size="lg"
              color="primary"
              to="https://wa.link/o3gf57"
              class="justify-center"
            /> -->
            <UButton
              label="Cotizar plan personalizado"
              icon="i-heroicons-device-phone-mobile"
              trailing
              size="lg"
              class="justify-center w-fit text-lg md:text-sm mx-auto z-10"
              color="primary"
              to="https://wa.link/o3gf57"
            >
            </UButton>
          </section>
        </UCard>
      </section>
    </UContainer>
    <!-- <MainSection :loading="isLoading">
    <template #heading>
    </template>

    <template #content>

    </template>
  </MainSection> -->
  </main>
</template>
