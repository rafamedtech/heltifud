<script setup>
const store = useProductStore();
const { macros } = storeToRefs(store);
</script>

<template>
  <div class="card max-w-md h-fit">
    <div class="card-body p-0">
      <h2 class="card-title mb-4">Macronutrientes</h2>
      <div class="stats bg-base-200 stats-vertical shadow">
        <div class="stat">
          <div class="stat-title font-bold text-base">Calorías</div>
          <div class="text-base flex gap-2 mt-2">
            <input type="number" class="input w-24 input-sm" v-model="macros.calories" />
            <p>Cal</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title font-bold text-base">Proteínas</div>
          <div class="text-base flex gap-2 mt-2">
            <input type="number" class="input w-24 input-sm" v-model="macros.protein" />
            <p>gr</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title font-bold text-base">Carbohidratos</div>
          <div class="text-base flex gap-2 mt-2">
            <input type="number" class="input w-24 input-sm" v-model="macros.carbs" />
            <p>gr</p>
          </div>
        </div>
        <div class="stat">
          <div class="stat-title font-bold text-base">Grasas</div>
          <div class="text-base flex gap-2 mt-2">
            <input type="number" class="input w-24 input-sm" v-model="macros.fat" />
            <p>gr</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
