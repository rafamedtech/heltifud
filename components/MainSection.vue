<script setup lang="ts">
interface Props {
  loading: Boolean;
}

defineProps<Props>();
</script>

<template>
  <section class="min-h-screen px-2 lg:px-8 pt-8 lg:pt-0 bg-[#f3f3f3]">
    <section class="sticky top-0 lg:static lg:pt-8 z-[999] bg-[#f3f3f3] lg:container px-4 lg:px-0">
      <slot name="heading"></slot>
    </section>

    <div v-if="loading" class="w-full flex justify-center h-[70vh] items-center">
      <Icon name="icon-park-outline:loading-four" size="48" class="animate-spin" />
    </div>
    <section class="pb-24 pt-8 lg:container" v-else>
      <slot name="content"></slot>
    </section>
  </section>
</template>
