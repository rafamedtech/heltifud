<script setup lang="ts">
const links = [
  [
    {
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'Nuestros planes',
      icon: 'i-heroicons-list-bullet-20-solid',
      to: '/nuestros-planes',
    },
    {
      label: 'Menú',
      icon: 'i-heroicons-newspaper',
      to: '/menu',
    },
  ],
];
</script>

<template>
  <main>
    <section class="bg-gray-950">
      <UContainer as="section" :ui="{ base: 'flex py-4 items-center justify-between', constrained: 'max-w-6xl' }">
        <Logo />

        <!-- <ul class="hidden lg:flex text-white gap-8">
          <li v-for="{ to, label, icon } in links">
            <NuxtLink
              :to="to"
              class="flex gap-2 items-center hover:text-primary-500 transition-colors"
              active-class="text-primary-500 border-b border-primary-500"
            >
              <Icon :name="icon" />
              <span>{{ label }}</span>
            </NuxtLink>
          </li>
        </ul> -->

        <UButton label="Ordenar" class="hidden lg:flex" to="/ordenar">
          <template #trailing><Icon name="heroicons:rocket-launch" size="24" /></template>
        </UButton>

        <UDropdown
          :items="links"
          :popper="{ placement: 'bottom-start' }"
          :ui="{
            item: {
              active: 'border border-transparent dark:bg-transparent bg-transparent ',
              inactive: 'hover:text-white text-gray-600 hover:before:bg-gray-800/50 border border-transparent',
              icon: {
                active: 'text-primary dark:text-primary',
                inactive: 'text-primary dark:text-primary',
              },
            },
          }"
        >
          <UButton
            color="gray"
            trailing-icon="i-heroicons-bars-3-bottom-right"
            class="h-fit"
            variant="ghost"
            :ui="{
              inline: 'flex-col',
              rounded: 'rounded-xl',
              color: {
                gray: {
                  ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800',
                },
              },
            }"
          />
        </UDropdown>
      </UContainer>
    </section>

    <slot></slot>
  </main>
</template>
