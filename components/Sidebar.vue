<script setup lang="ts">
import logo from '@/assets/img/logo-horizontal.png';
import { sidebarLinks } from '@/utils/sidebarLinks';
</script>

<template>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label>
    <ul class="menu p-4 w-60 min-h-full bg-base-200 text-base-content z-50">
      <li><img :src="logo" alt="" class="w-full h-20 hidden lg:block" /></li>
      <SidebarItem
        v-for="{ title, icon, href } in sidebarLinks"
        :key="title"
        :title="title"
        :icon="icon"
        :href="href"
      />
    </ul>
  </div>
</template>
