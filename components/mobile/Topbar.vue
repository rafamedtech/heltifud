<script setup lang="ts">
import logo from '@/assets/img/logo-horizontal.png';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() => (isDark.value ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'));
</script>
<template>
  <div class="p-4 flex shadow border-b justify-between bg-base-300 text-center z-[999] lg:hidden">
    <!-- Logo on mobile -->
    <img :src="logo" alt="" class="w-36 lg:w-40" />

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
  </div>
</template>
