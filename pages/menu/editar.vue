<script setup lang="ts">
import noData from '@/assets/img/no-data.svg';
const downloadedMenu = ref<WeeklyMenu>([]);
const downloadLoading = ref(false);
const saveLoading = ref(false);

const { data: currentMenu } = await useFetch<Menu>('/api/current-menu');

const toast = useToast();
async function downloadMenu() {
  downloadLoading.value = true;
  setTimeout(() => {
    downloadLoading.value = false;
  }, 2000);

  try {
    const data = await $fetch<WeeklyMenu>('/api/new-menu');
    downloadedMenu.value = data;

    toast.add({ title: 'El menú se ha descargado correctamente' });
  } catch (error) {
    toast.add({ title: 'Error', description: 'No se pudo descargar el menú' });
  }
}

async function saveMenu() {
  saveLoading.value = true;
  setTimeout(() => {
    saveLoading.value = false;
  }, 2000);

  console.log('save menu', downloadedMenu.value);

  // try {
  //   await $fetch('/api/save-menu', {
  //     method: 'POST',
  //     body: JSON.stringify(downloadedMenu.value),
  //   });

  toast.add({ title: 'El menú se ha guardado correctamente' });
  // } catch (error) {
  //   toast.add({ title: 'Error', description: 'No se pudo guardar el menú' });
  // }
}
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Actualizar menú" />

      <section class="flex gap-2">
        <UButton
          label="Descargar"
          size="lg"
          icon="i-heroicons-arrow-down-tray"
          :loading="downloadLoading"
          @click="downloadMenu"
        />
        <UButton label="Guardar" size="lg" icon="i-heroicons-cloud-arrow-up" :loading="saveLoading" @click="saveMenu" />
      </section>

      <section class="mt-8">
        <h3 class="text-2xl text-primary">Nuevo menu</h3>

        <section class="pb-8 pt-4 flex gap-4 max-w-6xl overflow-x-scroll" v-if="downloadedMenu.length">
          <UCard
            v-for="item in downloadedMenu"
            class="py-4 relative min-w-[20rem]"
            :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
          >
            <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
            <section class="relative z-10">
              <h3 class="text-3xl text-center font-bold text-white">{{ item.dayOfWeek }}</h3>
              <section class="flex flex-col gap-2">
                <Course label="Desayuno" :item="item.breakfast" />
                <Course label="Comida" :item="item.lunch" />
                <Course label="Cena" :item="item.dinner" />
              </section>
            </section>
          </UCard>
        </section>

        <section v-else class="grid place-content-center min-h-[40vh] gap-4">
          <figure class="w-40 mx-auto">
            <img :src="noData" alt="" class="w-full h-full" />
          </figure>
          <h4>Descarga el menú para poder verlo aquí</h4>
        </section>
      </section>

      <section class="mt-8">
        <h3 class="text-2xl text-primary">Menu actual</h3>

        <section class="pb-8 pt-4 flex gap-4 place-items-center max-w-6xl overflow-x-scroll">
          <UCard
            v-for="item in currentMenu?.weekMenus"
            class="py-4 relative min-w-[20rem]"
            :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
          >
            <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
            <section class="relative z-10">
              <h3 class="text-3xl text-center font-bold text-white">{{ item.dayOfWeek }}</h3>
              <section class="flex flex-col gap-2">
                <Course label="Desayuno" :item="item.breakfast" />
                <Course label="Comida" :item="item.lunch" />
                <Course label="Cena" :item="item.dinner" />
              </section>
            </section>
          </UCard>
        </section>
      </section>
    </UContainer>
  </main>
</template>
