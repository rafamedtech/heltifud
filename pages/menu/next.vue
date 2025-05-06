<script setup lang="ts">
import { format } from "date-fns";
import type { WeekMenu } from "@/types/Menu";
import type { Dish } from "@prisma/client";

const { data: menu } = await useFetch<WeekMenu>("/api/next-menu");
const weeklyMenu = menu.value?.dayMenus!;

const { data: dishes } = await useFetch<Dish[]>("/api/dishes");
const allDishes = dishes.value as Dish[];

const startDate = ref<Date>(new Date(menu.value?.startDate!));
const endDate = ref<Date>(new Date(menu.value?.endDate!));

const toast = useToast();
async function updateDates() {
  const dates = {
    id: menu.value?.id,
    startDate: startDate.value,
    endDate: endDate.value,
  };

  if (
    menu.value?.startDate === startDate.value &&
    menu.value?.endDate === endDate.value
  ) {
    toast.add({
      title: "No se han realizado cambios",
      icon: "i-heroicons-exclamation-circle",
    });
    return;
  }

  try {
    await $fetch("/api/menu/dates", {
      method: "POST",
      body: {
        dates,
      },
    });

    toast.add({
      title: "Fechas actualizadas",
      icon: "i-heroicons-check-circle",
    });
  } catch (error) {
    console.error("Error updating dates:", error);
  }
}

useSeoMeta({
  title: "Heltifud Meal preps | Menú de la semana",
  description: "Este es nuestro menú para la próxima semana.",
  ogDescription: "Este es nuestro menú para la próxima semana.",
  ogImage:
    "https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121",
  ogTitle: "Heltifud Meal preps | Menú de la semana",
});
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Menú de la semana" />
      <form @submit.prevent="updateDates" class="flex gap-4">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(startDate, 'd MMM, yyy')"
            variant="outline"
            color="gray"
          />

          <template #panel="{ close }">
            <DatePicker v-model="startDate" is-required @close="close" />
          </template>
        </UPopover>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(endDate, 'd MMM, yyy')"
            variant="outline"
            color="gray"
          />

          <template #panel="{ close }">
            <DatePicker v-model="endDate" is-required @close="close" />
          </template>
        </UPopover>

        <UButton
          type="submit"
          icon="i-heroicons-arrow-up-circle"
          label="Guardar"
        />
      </form>

      <section
        class="grid max-w-6xl place-items-center gap-4 overflow-x-scroll pb-8 pt-4"
      >
        <Suspense>
          <template #fallback>
            <Icon name="svg-spinners:gooey-balls-2" size="32" />
          </template>

          <template #default>
            <Tabs :day-menus="weeklyMenu" :dishes="allDishes" />
          </template>
        </Suspense>
      </section>
    </UContainer>
  </main>
</template>
