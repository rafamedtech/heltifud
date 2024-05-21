<script setup lang="ts">
// import type { DayWithMeals } from '@/types/Menu';
import { breakfastOptions, lunchOptions, sideOptions } from '@/utils/products';

// const { data: days } = await useFetch<WeeklyMenu[]>('/api/menu');

const isLoading = ref(true);
const btnLoading = ref(false);

const menu = ref([
  {
    name: 'Lunes',
    breakfast: {
      main: {
        name: 'Huevos con pechuga de pavo',
        calories: 240,
        type: 'breakfast',
      },
      side: {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
      side2: null,
    },
    lunch: {
      main: {
        name: 'Salpicón de res',
        calories: 352,
        type: 'main',
      },
      side: null,
      side2: null,
    },
    dinner: {
      main: {
        name: 'Sandwich de pollo',
        calories: 423,
        type: 'main',
      },
      side: {
        name: 'Papas horneadas',
        calories: 131,
        type: 'side',
      },
      side2: null,
    },
  },
  {
    name: 'Martes',
    breakfast: {
      main: {
        name: 'Huevos con pechuga de pavo',
        calories: 240,
        type: 'breakfast',
      },
      side: {
        name: 'Frijol',
        calories: 347,
        type: 'side',
      },
      side2: null,
    },
    lunch: {
      main: {
        name: 'Salpicón de res',
        calories: 352,
        type: 'main',
      },
      side: null,
      side2: null,
    },
    dinner: {
      main: {
        name: 'Sandwich de pollo',
        calories: 423,
        type: 'main',
      },
      side: {
        name: 'Papas horneadas',
        calories: 131,
        type: 'side',
      },
      side2: null,
    },
  },
]);

// function removeMeal(dayName: string, mealName: string, mealType: 'breakfast' | 'lunch' | 'dinner') {
//   const day = ref(menu.value.find((day) => day.name === dayName));

//   if (day.value) {
//     const newArray = day.value?.[mealType].filter((meal) => meal.name !== mealName);

//     day.value[mealType] = newArray;
//   }
// }

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
  // menu.value = days.value as any;
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
      content: 'https://cdn.shopify.com/s/files/1/0752/9424/5145/files/logo-horizontal-dark.png?v=1698184121',
    },
  ],
});

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <main>
    <UContainer as="section" :ui="{ base: 'py-8', constrained: 'max-w-6xl' }">
      <AppHeading title="Editar menú" />
      <section class="mt-8">
        <section class="mb-4 flex justify-end">
          <UButton
            :label="btnLoading ? 'Guardando...' : 'Guardar Cambios'"
            size="lg"
            :loading="btnLoading"
            @click="saveChanges"
          />
        </section>
        <section class="grid gap-2 lg:grid-cols-3">
          <!-- Lunes -->
          <UCard
            :ui="{
              base: 'overflow-hidden',
              body: { base: 'min-h-[30rem]  h-full text-sm gap-4', padding: 'sm:p-3' },
              header: { padding: 'sm:px-3' },
              ring: '',
              divide: '',
            }"
            v-for="day in menu"
          >
            <template #header>
              <h3 class="text-2xl">{{ day.name }}</h3>
            </template>

            <section class="mb-4">
              <UDivider label="Desayuno" :ui="{ label: 'text-lg text-primary' }" />
              <section class="flex flex-col gap-2">
                <UFormGroup label="Platillo principal">
                  <USelectMenu
                    v-model="day.breakfast.main"
                    :options="breakfastOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="day.breakfast.side"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].breakfast[1].name, 'breakfast')" -->
                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="day.breakfast.side"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="day.breakfast.side2"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].breakfast[2].name, 'breakfast')" -->
                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="day.breakfast.side2"
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
                    v-model="day.lunch.main"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="day.lunch.side"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].lunch[1].name, 'lunch')" -->

                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="day.lunch.side"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="day.lunch.side2"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].lunch[2].name, 'lunch')" -->

                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="day.lunch.side2"
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
                    v-model="day.dinner.main"
                    :options="lunchOptions"
                    placeholder="Selecciona un platillo"
                    option-attribute="name"
                  />
                </UFormGroup>

                <section class="relative">
                  <Icon
                    v-if="day.dinner.side"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].dinner[1].name, 'dinner')" -->
                  <UFormGroup label="Guarnición">
                    <USelectMenu
                      v-model="day.dinner.side"
                      :options="sideOptions"
                      placeholder="Selecciona una"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </section>

                <section class="relative">
                  <Icon
                    v-if="day.dinner.side2"
                    name="heroicons:x-mark"
                    class="absolute text-red-500 right-0 top-1 cursor-pointer"
                  />
                  <!-- @click="removeMeal(menu[0].name, menu[0].dinner[2].name, 'dinner')" -->
                  <UFormGroup label="Guarnición 2">
                    <USelectMenu
                      v-model="day.dinner.side2"
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
    </UContainer>
  </main>
</template>
