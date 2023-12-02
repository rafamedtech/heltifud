<script setup lang="ts">
defineProps<{
  label?: string;
  placeholder?: string;
  isrequired?: boolean;
  modelValue?: string | string[] | number | undefined;
}>();

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value;
</script>

<template>
  <div class="form-control gap-2">
    <label :for="label" class="dark:text-base-100"
      >{{ label }}<span v-if="isrequired" class="text-red-500">*</span></label
    >
    <textarea
      v-bind="$attrs"
      class="textarea textarea-bordered border-2 bg-white dark:text-base-100 dark:border-base-100/10 border-base-200 dark:bg-dark-strong focus:ring focus:ring-primary"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', handleInputChange($event))"
    ></textarea>
  </div>
</template>
