<script setup lang="ts">
// const { sortProducts } = useProducts();
interface Props {
  order: string;
}

defineProps<Props>();
</script>

<template>
  <thead>
    <tr class="border-b border-white/10 text-lg">
      <th>SKU</th>
      <th>
        Nombre
        <!-- <Icon
          name="icon-park-outline:sort-three"
          @click="sortProducts('name', order)"
          class="cursor-pointer"
        /> -->
      </th>
      <th>
        Categoría
        <!-- <Icon
          name="icon-park-outline:sort-three"
          @click="sortProducts('category', order)"
          class="cursor-pointer"
        /> -->
      </th>
      <th></th>
    </tr>
  </thead>
</template>
