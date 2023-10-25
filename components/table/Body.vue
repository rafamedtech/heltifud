<script setup lang="ts">
interface Props {
  items: any[];
}

defineProps<Props>();
</script>

<template>
  <tbody>
    <TableRow v-for="{ node } in items" :key="node.id" :item="node" />
  </tbody>
</template>
