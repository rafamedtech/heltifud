<script setup lang="ts">
import type { Dish } from "@prisma/client";
import type { Meal } from "@/types/Menu";

interface Props {
  label: string;
  item: Meal;
  //   dishes?: Dish[] | null | undefined;
}

const loading = ref(false);

// async function search(q: string) {
//   loading.value = true;

//   const dishes: any[] = await $fetch("/api/dishes/all-dishes");

//   loading.value = false;
//   return dishes;
// }

// const { data: dishes } = await useFetch<Dish[]>("/api/dishes/all-dishes");
const dishes = ref<Dish[]>([]);

const { item, label } = defineProps<Props>();
</script>

<template>
  <section class="h-full w-full pt-4">
    <h4 class="text-primary-500 text-xl">{{ label }}</h4>
    <section class="grid w-full grid-rows-3 gap-2 pt-4 text-white lg:text-base">
      <div class="flex h-1/3 w-full items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="[...dishes]"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="item.mainDish.name"
          option-attribute="name"
        />

        <div class="flex w-1/4 gap-2">
          <UInput
            type="number"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="item.mainDish.calories"
          /><span>Cal</span>
        </div>
      </div>
      <div
        class="flex h-1/3 items-center justify-between gap-2"
        v-if="item.side1?.name"
      >
        <USelectMenu
          :loading="loading"
          :options="[...dishes]"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="item.side1.name"
          placeholder="Selecciona un plato"
          option-attribute="name"
        />

        <div class="flex w-1/4 gap-2">
          <UInput
            type="number"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="item.side1.calories"
          /><span>Cal</span>
        </div>
      </div>
      <div class="flex h-1/3 items-center justify-between gap-2">
        <USelectMenu
          :loading="loading"
          :options="[...dishes]"
          class="flex h-1/3 w-3/4 items-center justify-between gap-2"
          v-model="item.side2.name"
          option-attribute="name"
          placeholder="Selecciona un plato"
        />

        <div class="flex w-1/4 gap-2">
          <UInput
            type="number"
            class="flex h-1/3 w-full items-center justify-between gap-2"
            v-model="item.side2.calories"
          /><span>Cal</span>
        </div>
      </div>
    </section>
  </section>
</template>
