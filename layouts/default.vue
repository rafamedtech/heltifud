<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() => (isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'));
</script>

<template>
  <main class="relative">
    <section class="bg-gray-950 z-10 relative">
      <UContainer as="section" :ui="{ base: 'flex py-4 items-center justify-between', constrained: 'max-w-6xl' }">
        <Logo />

        <UHorizontalNavigation
          :links="links"
          class="hidden md:block w-fit"
          :ui="{
            active: 'text-white',
            inactive: 'text-gray-400 hover:text-white',
            before: 'hover:before:bg-gray-800/50',
            icon: {
              active: 'text-white dark:text-white',
              inactive: 'text-gray-500 group-hover:text-gray-200',
            },
          }"
        />

        <section class="flex gap-4 items-center">
          <ClientOnly>
            <UButton
              :icon="darkModeIcon"
              variant="ghost"
              color="gray"
              size="xl"
              :ui="{
                inline: 'flex-col',
                rounded: 'rounded-xl',
                color: {
                  gray: {
                    ghost: 'text-gray-200 hover:text-gray-200 hover:bg-gray-800',
                  },
                },
              }"
              class="flex-1"
              @click="toggleDark()"
            />
          </ClientOnly>

          <UButton
            label="Ordenar"
            icon="i-heroicons-rocket-launch"
            class="hidden lg:flex"
            size="lg"
            to="https://wa.me/c/5216648161284"
          />

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
            class="lg:hidden"
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
        </section>
      </UContainer>
    </section>

    <section class="bg-gray-50 min-h-dvh dark:bg-neutral-800">
      <slot></slot>
    </section>

    <footer class="bg-gray-950">
      <UContainer as="section" class="py-4">
        <section class="flex justify-center mb-2">
          <Logo />
        </section>
        <p class="text-center text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }}</p>
        <p class="text-center text-gray-500 text-sm">Servicio disponible para Tijuana y Rosarito, B.C.</p>
      </UContainer>
    </footer>
  </main>
</template>
