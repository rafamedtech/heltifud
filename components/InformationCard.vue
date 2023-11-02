<script setup lang="ts">
// Type imports

interface Props {
  product: any;
}

defineProps<Props>();
</script>

<template>
  <div class="card max-w-xl h-fit">
    <div class="card-body p-0">
      <h2 class="card-title mb-4">Información general</h2>
      <div class="stats bg-base-200 stats-vertical shadow">
        <div class="stat">
          <div class="stat-title font-bold text-xl">SKU</div>
          <div class="text-base">
            {{ product.productByHandle.variants.edges[0].node.sku }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title font-bold text-xl">Descripción</div>
          <div class="text-base">{{ product.productByHandle.description }}</div>
        </div>

        <div class="stat">
          <div class="stat-title font-bold text-xl">Categoría</div>
          <!-- <div
            class="badge badge-primary my-2 rounded-lg"
            :class="{
              'badge-primary':
                product.productByHandle.collections.edges[0].node.title === Category.GUARNICIONES,
              'badge-secondary':
                product.productByHandle.collections.edges[0].node.title === Category.COMIDA,
              'badge-accent':
                product.productByHandle.collections.edges[0].node.title === Category.DESAYUNO,
            }"
          >
            {{ product.productByHandle.collections.edges[0].node.title }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
