<script setup lang="ts">
interface Props {
  loading: Boolean;
}

defineProps<Props>();
</script>

<template>
  <section class="min-h-screen px-2 lg:px-8 pt-4 lg:pt-0 bg-[#f3f3f3]">
    <section class="lg:pt-8 z-[999] bg-[#f3f3f3] lg:container px-0">
      <slot name="heading"></slot>
    </section>

    <div v-if="loading" class="w-full flex justify-center h-[70vh] items-center">
      <Icon name="icon-park-outline:loading-four" size="48" class="animate-spin" />
    </div>
    <section class="lg:pb-24 pt-8 lg:container relative" v-else>
      <slot name="content"></slot>
    </section>
  </section>
</template>
