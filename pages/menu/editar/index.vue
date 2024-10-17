<script setup lang="ts">
import type { WeekMenu, DayMenu } from "@/types/Menu";
import { background } from "@/utils/helpers";

const downloadedMenu = ref<DayMenu[]>([]);

const saveLoading = ref(false);

const { data: currentMenu } = await useFetch<WeekMenu>("/api/current-menu");

const { data: menus } = await useFetch<WeekMenu[]>("/api/all-menus");

console.log("menus", menus.value);

const toast = useToast();

async function saveMenu() {
  saveLoading.value = true;
  setTimeout(() => {
    saveLoading.value = false;
  }, 2000);

  console.log("save menu", downloadedMenu.value);

  // try {
  //   await $fetch('/api/save-menu', {
  //     method: 'POST',
  //     body: JSON.stringify(downloadedMenu.value),
  //   });

  toast.add({ title: "El menú se ha guardado correctamente" });
  // } catch (error) {
  //   toast.add({ title: 'Error', description: 'No se pudo guardar el menú' });
  // }
}
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Actualizar menú" />

      <section class="mt-8">
        <h3 class="text-2xl text-primary">Menús disponibles</h3>

        <section
          class="flex max-w-6xl place-items-center gap-4 overflow-x-scroll pb-8 pt-4"
        >
          <NuxtLink v-for="item in menus" :to="`/menu/editar/${item.id}`">
            <UCard
              class="relative h-full min-w-[20rem] py-4"
              :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
            >
              <img
                :src="background"
                class="absolute inset-0 z-0 h-full w-full rounded-xl object-cover"
              />
              <section class="relative z-10">
                <div>
                  <h3 class="text-center text-3xl font-bold text-white">
                    {{ item.name }}
                  </h3>
                </div>
              </section>
            </UCard>
          </NuxtLink>
        </section>
      </section>

      <section class="mt-8">
        <h3 class="text-2xl text-primary">Menu actual</h3>

        <section
          class="flex max-w-6xl place-items-center gap-4 overflow-x-scroll pb-8 pt-4"
        >
          <ClientOnly>
            <UCard
              v-for="item in currentMenu?.dayMenus"
              class="relative min-w-[20rem] py-4"
              :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
            >
              <img
                :src="background"
                class="absolute inset-0 z-0 h-full w-full rounded-xl object-cover"
              />
              <section class="relative z-10">
                <h3 class="text-center text-3xl font-bold text-white">
                  {{ item.dayOfWeek }}
                </h3>
                <section class="flex flex-col gap-2">
                  <Course label="Desayuno" :item="item.breakfast" />
                  <Course label="Comida" :item="item.lunch" />
                  <Course label="Cena" :item="item.dinner" />
                </section>
              </section>
            </UCard>
          </ClientOnly>
        </section>
      </section>
    </UContainer>
  </main>
</template>
