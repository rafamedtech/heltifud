<script setup lang="ts">
import comodidad from '@/assets/img/benefits/comodidad.svg';
import salud from '@/assets/img/benefits/salud.svg';
import variedad from '@/assets/img/benefits/variedad.svg';
import personalizacion from '@/assets/img/benefits/personalizacion.svg';

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
</script>

<template>
  <main class="min-h-dvh">
    <section
      class="hero mx-auto relative h-[60vh] flex px-5 py-14 items-center justify-center flex-col md:flex-row-reverse"
    >
      <UContainer class="z-10 md:text-left w-full" :ui="{ constrained: 'max-w-6xl' }">
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
            size="lg"
            to="/nuestros-planes"
            class="bg-primary-500"
            icon="i-heroicons-list-bullet-20-solid"
          />
        </div>
      </UContainer>
    </section>

    <UContainer class="py-4">
      <h2 class="sm:text-3xl lg:text-4xl text-2xl mb-4 font-semibold text-primary-500">¿Por qué elegirnos?</h2>
      <section class="flex flex-col gap-4">
        <UCard v-for="benefit in benefits" :ui="{ rounded: 'rounded-xl' }">
          <section class="flex flex-col gap-2">
            <img :src="benefit.img" :alt="benefit.title" class="h-40 w-full" />
            <h3 class="text-primary text-2xl">{{ benefit.title }}</h3>
            <p class="text-lg">{{ benefit.description }}</p>
          </section>
        </UCard>
      </section>
    </UContainer>
  </main>
</template>
