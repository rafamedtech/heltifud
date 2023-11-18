<script setup lang="ts">
const { selected, labelFor } = defineProps<{
  selected: boolean;
  labelFor: string;
}>();
</script>

<template>
  <label :for="labelFor">
    <div
      class="card border border-primary text-base-100"
      :class="{ 'bg-base-100 text-white border-2': selected }"
    >
      <div class="card-body relative">
        <slot></slot>
      </div>
    </div>
  </label>
</template>
