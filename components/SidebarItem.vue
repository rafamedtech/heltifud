<script setup lang="ts">
interface Props {
  href: String;
  icon: String;
  title: String;
}

defineProps<Props>();
</script>

<template>
  <li>
    <NuxtLink :to="(href as string)" active-class="bg-base-100">
      <Icon :name="(icon as string)" size="24" />
      <span>{{ title }}</span>
    </NuxtLink>
  </li>
</template>
