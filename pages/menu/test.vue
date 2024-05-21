<script setup lang="ts">
// const { data: menu } = await useFetch('/api/weekly-menu');
const { data: menu } = await useFetch<WeeklyMenu>('/api/menu');
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Menú de la semana" :description="menuDate" />
      <section class="lg:hidden flex justify-center mt-8">
        <UButton
          label="Ordenar"
          size="lg"
          trailing-icon="i-heroicons-rocket-launch"
          to="https://wa.me/c/5216648161284"
          target="_blank"
        />
      </section>
      <section class="mt-8 pb-8 px-2">
        <UCarousel
          :items="menu"
          :ui="{
            item: 'basis-full',
            container: 'rounded-xl  mx-auto',
            indicators: {
              wrapper: 'relative bottom-0 mt-4 max-w-full',
            },
          }"
          indicators
          class="lg:w-[20rem] mx-auto"
        >
          <template #default="{ item }">
            <UCard class="w-full py-4 relative" :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }">
              <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
              <section class="relative z-10">
                <h3 class="text-3xl text-center font-bold text-white">{{ item.dayOfWeek }}</h3>
                <section class="flex flex-col gap-4">
                  <CourseNew label="Desayuno" :item="item.breakfast" />
                  <CourseNew label="Comida" :item="item.lunch" />
                  <CourseNew label="Cena" :item="item.dinner" />
                </section>
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
    </UContainer>
  </main>
</template>
