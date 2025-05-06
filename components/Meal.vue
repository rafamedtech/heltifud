<script setup lang="ts">
import type { Dish } from "@prisma/client";
import type { Meal } from "@/types/Menu";

interface Props {
  label: string;
  item: Meal;
  dishes?: Dish[];
  sides?: Dish[];
}

const loading = ref(false);

const { item, label } = defineProps<Props>();

const mainDish = ref(
  item.mainDish || {
    name: "",
    calories: 0,
  },
);

const side1 = ref(
  item.side1 || {
    name: "",
    calories: 0,
  },
);

const side2 = ref(
  item.side2 || {
    name: "",
    calories: 0,
  },
);

function resetMainDish() {
  mainDish.value.name = "";
  mainDish.value.calories = 0;
}
function resetSide1() {
  side1.value.name = "";
  side1.value.calories = 0;
}
function resetSide2() {
  side2.value.name = "";
  side2.value.calories = 0;
}
</script>

<template>
  <section class="h-full w-full min-w-full pt-4">
    <h4 class="text-primary-500 text-xl">{{ label }}</h4>
    <section class="grid w-full grid-rows-3 gap-2 pt-4 lg:text-base">
      <div class="flex h-1/3 w-full items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="dishes"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="mainDish.name"
          placeholder="Selecciona un plato"
          option-attribute="name"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
        />

        <div class="flex w-1/4 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="item.mainDish.calories"
          /><span>Cal</span>
        </div>
        <UButton
          icon="i-heroicons-x-circle"
          color="gray"
          @click="resetMainDish"
        />
      </div>

      <div class="flex h-1/3 items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="sides"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="side1.name"
          placeholder="Selecciona un plato"
          option-attribute="name"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
        />

        <div class="flex w-1/4 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="side1.calories"
          /><span>Cal</span>
        </div>
        <!-- <UButton icon="i-heroicons-check-circle" />-->
        <UButton icon="i-heroicons-x-circle" color="gray" @click="resetSide1" />
      </div>
      <div class="flex h-1/3 items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="sides"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="side2.name"
          option-attribute="name"
          placeholder="Selecciona un plato"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
        />

        <div class="flex w-1/4 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="side2.calories"
          /><span>Cal</span>
        </div>
        <!-- <UButton icon="i-heroicons-check-circle" /> -->
        <UButton icon="i-heroicons-x-circle" color="gray" @click="resetSide2" />
      </div>
      <section class="flex items-center justify-end">
        <UButton icon="i-heroicons-check-circle" label="Guardar" />
      </section>
    </section>
  </section>
</template>
