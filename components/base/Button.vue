<script setup lang="ts">
defineProps<{
  type: 'button' | 'submit' | 'reset';
  color?: string;
  loading?: boolean;
}>();
</script>

<template>
  <button
    :type="type"
    class="btn lg:w-52 normal-case text-lg"
    :class="{ 'btn-accent dark:btn-primary w-[12rem] min-w-fit': color === 'primary' }"
  >
    <Icon v-if="loading" class="animate-spin" name="icon-park-outline:loading-four" size="32" />
    <span v-else class="text-lg"> <slot></slot> </span>
  </button>
</template>
