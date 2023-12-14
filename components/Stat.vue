<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <div class="stat p-4">
    <div class="stat-figure text-primary">
      <Icon :name="icon" size="32" />
    </div>
    <div class="stat-title text-base-300">{{ title }}</div>
    <div class="stat-value">
      <slot></slot>
    </div>
  </div>
</template>
