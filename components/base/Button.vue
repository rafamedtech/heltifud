<script setup lang="ts">
defineProps<{
  type?: string;
  loading?: boolean;
}>();
</script>

<template>
  <button
    class="btn mt-4 lg:w-52 normal-case"
    :class="{ 'btn-accent dark:btn-primary w-[12rem] min-w-fit': type === 'primary' }"
  >
    <Icon v-if="loading" class="animate-spin" name="icon-park-outline:loading-four" size="32" />
    <span v-else class="text-lg"> <slot></slot> </span>
  </button>
</template>
