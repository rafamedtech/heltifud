<script setup lang="ts">
const isLoading = ref(true);
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Control de gastos" />
    </template>
    <template #content> </template>
  </MainSection>
</template>
