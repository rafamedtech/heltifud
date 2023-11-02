<script setup lang="ts">
// Type imports
// import { Category } from '@/types/category';

interface Props {
  item: any;
}

defineProps<Props>();
</script>

<template>
  <tr class="hover">
    <th>{{ item.variants.edges[0].node.sku }}</th>
    <td>{{ item.title }}</td>
    <td>
      <!-- <span
        class="badge rounded-lg"
        :class="{
          'badge-primary': item.collections.edges[0].node.title === Category.GUARNICIONES,
          'badge-secondary': item.collections.edges[0].node.title === Category.COMIDA,
          'badge-accent': item.collections.edges[0].node.title === Category.DESAYUNO,
        }"
        >{{ item.collections.edges[0].node.title }}</span
      > -->
    </td>
    <td>
      <NuxtLink
        :to="{ name: 'productos-handle', params: { handle: item.handle } }"
        class="underline"
      >
        Detalles
      </NuxtLink>
    </td>
  </tr>
</template>
