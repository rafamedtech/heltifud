<script setup lang="ts">
defineProps<{
  sidebar?: boolean;
}>();
</script>

<template>
  <div class="divider" :class="{ 'before:bg-base-100/10 after:bg-base-100/10': sidebar }"></div>
</template>
