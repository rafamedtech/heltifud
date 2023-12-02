<script setup lang="ts">
const { label, items } = defineProps<{
  label: string;
  items: string[];
}>();

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="form-control gap-2">
    <label for="" class="dark:text-base-100">{{ label }}</label>
    <select
      v-bind="$attrs"
      @input="$emit('update:modelValue', handleInputChange($event))"
      id=""
      class="select w-full bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
    >
      <option v-for="item in items" :value="item" :key="item">{{ item }}</option>
    </select>
  </div>
</template>
