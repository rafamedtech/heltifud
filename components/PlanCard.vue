<script setup lang="ts">
const { selected, labelFor } = defineProps<{
  selected: boolean;
  labelFor: string;
}>();
</script>

<template>
  <label :for="labelFor">
    <UCard
      class="border border-primary-500"
      :class="{ 'bg-base-100 text-white border-2': selected }"
    >
      <slot></slot>
    </UCard>
  </label>
</template>
