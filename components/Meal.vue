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

const newMeal = reactive<Meal>({
  mainDish: item.mainDish || {
    name: "",
    calories: 0,
  },
  side1: item.side1 || {
    name: "",
    calories: 0,
  },
  side2: item.side2 || {
    name: "",
    calories: 0,
  },
});

function resetMainDish() {
  newMeal.mainDish.name = "";
  newMeal.mainDish.calories = 0;
}
function resetSide1() {
  newMeal.side1.name = "";
  newMeal.side1.calories = 0;
}
function resetSide2() {
  newMeal.side2.name = "";
  newMeal.side2.calories = 0;
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
          v-model="newMeal.mainDish"
          placeholder="Selecciona un plato"
          option-attribute="name"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
          :ui="{ input: 'placeholder-gray-200' }"
        />

        <div class="flex w-24 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="newMeal.mainDish.calories"
            disabled
          /><span>Cal</span>
        </div>
        <UButton
          icon="i-heroicons-x-circle"
          color="red"
          variant="ghost"
          @click="resetMainDish"
        />
      </div>

      <div class="flex h-1/3 items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="sides"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="newMeal.side1"
          placeholder="Selecciona un plato"
          option-attribute="name"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
          :ui="{ input: 'placeholder-gray-200' }"
        />

        <div class="flex w-24 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="newMeal.side1.calories"
            disabled
          /><span>Cal</span>
        </div>

        <UButton
          icon="i-heroicons-x-circle"
          color="red"
          variant="ghost"
          @click="resetSide1"
        />
      </div>
      <div class="flex h-1/3 items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="sides"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="newMeal.side2"
          option-attribute="name"
          placeholder="Selecciona un plato"
          searchable
          searchable-placeholder="Busca un platillo..."
          size="lg"
          :ui="{ input: 'placeholder-gray-200' }"
        />

        <div class="flex w-24 items-center gap-2">
          <UInput
            type="number"
            size="lg"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="newMeal.side2.calories"
            disabled
          /><span>Cal</span>
        </div>

        <UButton
          icon="i-heroicons-x-circle"
          color="red"
          variant="ghost"
          @click="resetSide2"
        />
      </div>
      <section class="flex items-center justify-end">
        <UButton icon="i-heroicons-check-circle" label="Guardar" />
      </section>
    </section>
  </section>
</template>
