<script setup>
import { sidebarLinks } from '@/utils/sidebarLinks';
</script>

<template>
  <div class="flex w-screen max-w-full justify-center lg:hidden">
    <div class="btm-nav z-[999] bg-base-300 max-w-full border-t">
      <MobileNavbarItem v-for="link in sidebarLinks" :item="link" :key="link.id" />
    </div>
  </div>
</template>
