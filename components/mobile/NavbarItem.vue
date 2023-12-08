<script setup lang="ts">
interface Props {
  item: SidebarLink;
}
defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="item.href"
    class="text-gray-300"
    active-class="text-primary bg-primary/10 rounded-lg font-bold"
  >
    <Icon :name="item.icon" class="text-xl" />
    <span class="btm-nav-label text-xs">{{ item.title }}</span>
  </NuxtLink>
</template>
