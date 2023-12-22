<script setup lang="ts">
const isOpen = ref(false);

const links = [
  {
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Nuestros planes',
    icon: 'i-heroicons-list-bullet-20-solid',
    to: '/',
  },
  {
    label: 'Menú',
    icon: 'i-heroicons-newspaper',
    to: '/menu',
  },
];
</script>

<template>
  <main>
    <!-- <div class="bg-primary-500 text-xs text-white text-center py-3">
      <p class="tracking-widest">Servicio disponible únicamente para Tijuana, B.C.</p>
    </div> -->
    <section class="bg-gray-950">
      <UContainer
        as="section"
        :ui="{ base: 'flex py-4 items-center justify-between', constrained: 'max-w-6xl' }"
      >
        <Logo />

        <ul class="hidden lg:flex text-white gap-8">
          <li v-for="{ to, label, icon } in links">
            <NuxtLink
              :to="to"
              class="flex gap-2 items-center"
              active-class="text-primary-500 border-b border-primary-500"
            >
              <Icon :name="icon" />
              <span>{{ label }}</span>
            </NuxtLink>
          </li>
        </ul>

        <UButton label="Ordenar" class="hidden lg:flex" to="/ordenar">
          <template #trailing><Icon name="heroicons:rocket-launch" size="24" /></template>
        </UButton>

        <button class="text-white lg:hidden" @click="() => (isOpen = !isOpen)">
          <Icon name="icon-park-outline:align-text-both" size="28" />
        </button>
      </UContainer>
    </section>

    <USlideover
      v-model="isOpen"
      prevent-close
      :ui="{
        body: { base: ' text-white' },
        background: 'bg-gray-950',
      }"
      class="lg:hidden"
    >
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-primary-500 ',
          background: '',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold leading-6 text-white">Navegación</h3>
            <UButton
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1 text-white"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UVerticalNavigation
          :links="links"
          :ui="{
            size: 'text-lg',
            icon: { base: 'flex-shrink-0 w-8 h-8' },
            active: 'before:bg-primary',
          }"
        />
      </UCard>
    </USlideover>
    <slot></slot>
  </main>
</template>
