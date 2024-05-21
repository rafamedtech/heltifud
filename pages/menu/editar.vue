<script setup lang="ts">
const downloadedMenu = ref<WeeklyMenu>([]);
const downloadLoading = ref(false);
const saveLoading = ref(false);

const toast = useToast();
async function downloadMenu() {
  downloadLoading.value = true;
  setTimeout(() => {
    downloadLoading.value = false;
  }, 2000);

  try {
    const data = await $fetch<WeeklyMenu>('/api/menu');
    downloadedMenu.value = data;

    toast.add({ title: 'El menú se ha descargado correctamente' });
  } catch (error) {
    toast.add({ title: 'Error', description: 'No se pudo descargar el menú' });
  }
}
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Actualizar menú" />

      <section>
        <div class="flex gap-2">
          <UButton
            label="Descargar"
            size="lg"
            icon="i-heroicons-arrow-down-tray"
            :loading="downloadLoading"
            @click="downloadMenu()"
          />
          <UButton label="Guardar" size="lg" icon="i-heroicons-cloud-arrow-up" :loading="saveLoading" />
        </div>
      </section>
    </UContainer>

    <section class="mt-8 pb-8 px-4 grid grid-cols-5 place-items-center max-w-[90rem] mx-auto">
      <UCard
        v-for="item in downloadedMenu"
        class="w-full py-4 relative"
        :ui="{ background: 'bg-gray-900', rounded: 'rounded-xl' }"
      >
        <img :src="background" class="absolute w-full h-full object-cover inset-0 rounded-xl z-0" />
        <section class="relative z-10">
          <h3 class="text-3xl text-center font-bold text-white">{{ item.day }}</h3>
          <section class="flex flex-col gap-2">
            <Course label="Desayuno" :item="item.desayuno" />
            <Course label="Comida" :item="item.comida" />
            <Course label="Cena" :item="item.cena" />
          </section>
        </section>
      </UCard>
    </section>
  </main>
</template>
