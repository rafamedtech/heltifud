<script setup lang="ts">
import { format } from "date-fns";
import type { WeekMenu } from "~/types/Menu";

const { getNextMenu, getDishes } = useMenu();
const menu = await getNextMenu();
const allDishes = await getDishes();

const updatedMenu = reactive<WeekMenu>({
  startDate: new Date(menu?.value?.startDate!),
  endDate: new Date(menu?.value?.endDate!),
  name: menu?.value?.name!,
  dayMenus: menu?.value?.dayMenus!,
  id: menu?.value?.id!,
  isActive: menu?.value?.isActive!,
  createdAt: menu?.value?.createdAt!,
  updatedAt: menu?.value?.updatedAt!,
});

const { toast } = useCustomToast();
async function updateDates() {
  const dates = {
    id: menu?.value?.id,
    startDate: updatedMenu.startDate,
    endDate: updatedMenu.endDate,
  };

  try {
    await $fetch("/api/menu/dates", {
      method: "POST",
      body: {
        dates,
      },
    });

    toast({
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
            :label="format(updatedMenu.startDate, 'd MMM, yyy')"
            variant="outline"
            color="gray"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="updatedMenu.startDate"
              is-required
              @close="close"
            />
          </template>
        </UPopover>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(updatedMenu.endDate, 'd MMM, yyy')"
            variant="outline"
            color="gray"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="updatedMenu.endDate"
              is-required
              @close="close"
            />
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
            <Tabs :day-menus="menu?.dayMenus" :dishes="allDishes" />
          </template>
        </Suspense>
      </section>
    </UContainer>
  </main>
</template>
