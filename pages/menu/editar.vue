<script setup lang="ts">
import type { DayWithMeals } from '@/types/Menu';
import { breakfastOptions, lunchOptions, sideOptions } from '@/utils/products';

const { data: days } = await useFetch<DayWithMeals[]>('/api/menu');

const isLoading = ref(true);
const btnLoading = ref(false);

const menu = ref([
  {
    name: 'Lunes',
    breakfast: [
      {
        name: 'Huevos con pechuga de pavo',
        calories: 240,
        type: 'breakfast',
      },
      {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
    ],
    lunch: [
      {
        name: 'Salpicón de res',
        calories: 352,
        type: 'main',
      },
    ],
    dinner: [
      {
        name: 'Sandwich de pollo',
        calories: 423,
        type: 'main',
      },
      {
        name: 'Papas horneadas',
        calories: 131,
        type: 'side',
      },
    ],
  },
  {
    name: 'Martes',
    breakfast: [
      {
        name: 'Huevos a la mexicana',
        calories: 222,
        type: 'breakfast',
      },
      {
        name: 'Frijol entero',
        calories: 347,
        type: 'side',
      },
    ],
    lunch: [
      {
        name: 'Pescado empanizado',
        calories: 234,
        type: 'main',
      },
      {
        name: 'Puré de papa',
        calories: 170,
        type: 'side',
      },
      {
        name: 'Verduras al vapor',
        calories: 43,
        type: 'side',
      },
    ],
    dinner: [
      {
        name: 'Fajitas de pollo',
        calories: 196,
        type: 'main',
      },
      {
        name: 'Arroz blanco',
        calories: 185,
        type: 'side',
      },
      {
        name: 'Verduras al vapor',
        calories: 43,
        type: 'side',
      },
    ],
  },
  {
    name: 'Miércoles',
    breakfast: [
      {
        name: 'Huevos con salchicha',
        calories: 276,
        type: 'breakfast',
      },
      {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
    ],
    lunch: [
      {
        name: 'Teriyaki de pollo',
        calories: 256,
        type: 'main',
      },
      {
        name: 'Arroz blanco',
        calories: 185,
        type: 'side',
      },
      {
        name: 'Arroz blanco',
        calories: 185,
        type: 'side',
      },
    ],
    dinner: [
      {
        name: 'Ensalada fría de pollo',
        calories: 511,
        type: 'main',
      },
    ],
  },
  {
    name: 'Jueves',
    breakfast: [
      {
        name: 'Papas con salchicha',
        calories: 200,
        type: 'breakfast',
      },
      {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
    ],
    lunch: [
      {
        name: 'Pescado a la mostaza',
        calories: 148,
        type: 'main',
      },
      {
        name: 'Arroz rojo',
        calories: 189,
        type: 'side',
      },
    ],
    dinner: [
      {
        name: 'Fajitas de res',
        calories: 149,
        type: 'main',
      },
      {
        name: 'Pasta con tomate',
        calories: 284,
        type: 'side',
      },
    ],
  },
  {
    name: 'Viernes',
    breakfast: [
      {
        name: 'Huevos revueltos',
        calories: 299,
        type: 'breakfast',
      },
      {
        name: 'Frijol entero',
        calories: 347,
        type: 'side',
      },
    ],
    lunch: [
      {
        name: 'Carne molida con verduras',
        calories: 242,
        type: 'main',
      },
      {
        name: 'Pasta con tomate',
        calories: 284,
        type: 'side',
      },
    ],
    dinner: [
      {
        name: 'Deshebrada de pollo',
        calories: 142,
        type: 'main',
      },
      {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
    ],
  },
]);

function removeMeal(dayName: string, mealName: string, mealType: 'breakfast' | 'lunch' | 'dinner') {
  const day = ref(menu.value.find((day) => day.name === dayName));

  if (day.value) {
    const newArray = day.value?.[mealType].filter((meal) => meal.name !== mealName);

    day.value[mealType] = newArray;
  }
}

const toast = useToast();

async function updateMenu() {
  try {
    await $fetch('/api/menu/update', {
      method: 'POST',
      body: {
        days: menu.value,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function saveChanges() {
  btnLoading.value = true;
  setTimeout(async () => {
    btnLoading.value = false;
    await updateMenu();
    toast.add({
      title: 'Cambios guardados',
    });
  }, 2000);
}

onMounted(() => {
  isLoading.value = false;
  menu.value = days.value as any;
});

useHead({
  title: 'Editar menú | Heltifud Meal preps',
  meta: [
    {
      name: 'description',
      content: 'Editar el menú de la próxima semana.',
    },
    // Facebook Meta tags
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://heltifud.com/menu/editar',
    },
    {
      property: 'og:title',
      content: 'Heltifud Meal preps',
    },
    {
      property: 'og:description',
      content: 'Editar el menú de la próxima semana.',
    },
    {
      property: 'og:image',
      content:
        'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Editar menú" />
    </template>

    <!-- Page content -->
    <template #content>
      <section class="mt-8">
        <section class="mb-4 flex justify-end">
          <UButton
            :label="btnLoading ? 'Guardando...' : 'Guardar Cambios'"
            size="lg"
            :loading="btnLoading"
            @click="saveChanges"
          />
        </section>
        <section class="grid gap-2 lg:grid-cols-5">
          <!-- Lunes -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <template #header>
              <h3 class="text-2xl">{{ menu[0].name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[0].breakfast[0]"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[0].breakfast[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].breakfast[1].name, 'breakfast')"
                  />
                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[0].breakfast[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[0].breakfast[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].breakfast[2].name, 'breakfast')"
                  />
                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[0].breakfast[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Comida" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[0].lunch[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[0].lunch[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].lunch[1].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[0].lunch[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[0].lunch[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].lunch[2].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[0].lunch[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Cena" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[0].dinner[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[0].dinner[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].dinner[1].name, 'dinner')"
                  />
                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[0].dinner[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[0].dinner[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[0].name, menu[0].dinner[2].name, 'dinner')"
                  />
                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[0].dinner[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
          </UCard>

          <!-- Martes -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <template #header>
              <h3 class="text-2xl">{{ menu[1].name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[1].breakfast[0]"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[1].breakfast[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].breakfast[1].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[1].breakfast[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[1].breakfast[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].breakfast[2].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[1].breakfast[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Comida" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[1].lunch[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[1].lunch[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].lunch[1].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[1].lunch[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[1].lunch[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].lunch[2].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[1].lunch[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Cena" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[1].dinner[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[1].dinner[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].dinner[1].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[1].dinner[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[1].dinner[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[1].name, menu[1].dinner[2].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[1].dinner[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
          </UCard>

          <!-- Miércoles -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <template #header>
              <h3 class="text-2xl">{{ menu[2].name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[2].breakfast[0]"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[2].breakfast[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].breakfast[1].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[2].breakfast[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[2].breakfast[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].breakfast[2].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[2].breakfast[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Comida" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[2].lunch[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[2].lunch[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].lunch[1].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[2].lunch[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[2].lunch[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].lunch[2].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[2].lunch[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Cena" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[2].dinner[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[2].dinner[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].dinner[1].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[2].dinner[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[2].dinner[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[2].name, menu[2].dinner[2].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[2].dinner[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
          </UCard>

          <!-- Jueves -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <template #header>
              <h3 class="text-2xl">{{ menu[3].name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[3].breakfast[0]"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[3].breakfast[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].breakfast[1].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[3].breakfast[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[3].breakfast[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].breakfast[2].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[3].breakfast[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Comida" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[3].lunch[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[3].lunch[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].lunch[1].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[3].lunch[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[3].lunch[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].lunch[2].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[3].lunch[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Cena" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[3].dinner[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[3].dinner[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].dinner[1].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[3].dinner[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[3].dinner[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[3].name, menu[3].dinner[2].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[3].dinner[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
          </UCard>

          <!-- Viernes -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
          >
            <template #header>
              <h3 class="text-2xl">{{ menu[4].name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[4].breakfast[0]"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[4].breakfast[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].breakfast[1].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[4].breakfast[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[4].breakfast[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].breakfast[2].name, 'breakfast')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[4].breakfast[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Comida" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[4].lunch[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[4].lunch[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].lunch[1].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[4].lunch[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[4].lunch[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].lunch[2].name, 'lunch')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[4].lunch[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
            <section class="mb-4">
              <UDivider label="Cena" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="menu[4].dinner[0]"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="menu[4].dinner[1]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].dinner[1].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="menu[4].dinner[1]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="menu[4].dinner[2]"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                    @click="removeMeal(menu[4].name, menu[4].dinner[2].name, 'dinner')"
                  />

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="menu[4].dinner[2]"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>
              </section>
            </section>
          </UCard>
        </section>
      </section>
    </template>
  </MainSection>
</template>
