<script setup lang="ts">
import logo from '@/assets/img/logo-horizontal.png';
</script>
<template>
  <div class="p-4 flex shadow border-b justify-between bg-base-300 text-center z-[999] lg:hidden">
    <!-- Logo on mobile -->
    <img :src="logo" alt="" class="w-36 lg:w-40" />

    <!-- <DarkLightBtn mobile /> -->
  </div>
</template>
