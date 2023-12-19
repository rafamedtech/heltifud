<script setup lang="ts">
import type { DayWithMeals, Course, MealType } from '~/types/Menu';

const { data: days } = await useFetch<DayWithMeals[]>('/api/menu');

const items = days.value?.map((day: DayWithMeals) => ({
  label: day.name,
}));

const getMealtypeByDay = (dayName: string, type: string): Course => {
  const day = days.value?.find((day: DayWithMeals) => day.name === dayName);
  return type === 'breakfast' ? day?.breakfast : type === 'lunch' ? day?.lunch : day?.dinner || [];
};

const currentMenu = ref(null);

const isLoading = ref(true);
const isOpen = ref(false);

const orderForm = reactive({
  name: 'Rafael Valenzuela',
  phone: '6642591920',
  address: 'San Patricio 6109, H14, Santa Fe I',
});

const breakfastQty = ref('');
const breakfastOptions = [
  {
    value: '',
    label: 'No quiero desayunos',
  },
  {
    value: '3',
    label: '3 días',
  },
  {
    value: '5',
    label: '5 días',
  },
];
const lunchQty = ref('');
const lunchOptions = [
  {
    value: '',
    label: 'No quiero comidas',
  },
  {
    value: '3',
    label: '3 días',
  },
  {
    value: '5',
    label: '5 días',
  },
];
const dinnerQty = ref('');
const dinnerOptions = [
  {
    value: '',
    label: 'No quiero cenas',
  },
  {
    value: '3',
    label: '3 días',
  },
  {
    value: '5',
    label: '5 días',
  },
];

const orderTotal = computed(() => 1);

onMounted(() => {
  isLoading.value = false;
  currentMenu.value = menu as any;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading
        title="Ingresar una orden"
        description="Elige entre nuestros planes básicos o flexibles"
      />
    </template>
    <template #content>
      <UForm :state="orderForm" class="space-y-4">
        <section class="flex flex-col gap-4 lg:w-1/2">
          <h3 class="text-xl text-primary-500">Información de contacto</h3>
          <UFormGroup label="Tu nombre">
            <UInput v-model="orderForm.name" />
          </UFormGroup>

          <UFormGroup label="Teléfono">
            <UInput v-model="orderForm.phone" />
          </UFormGroup>
          <UFormGroup label="Domicilio de entrega">
            <UInput v-model="orderForm.address" />
          </UFormGroup>
        </section>

        <section class="flex flex-col gap-2">
          <h3 class="text-xl text-primary-500">Elige tus planes</h3>
          <section class="px-2 lg:px-0 flex flex-col gap-4 mt-4 lg:grid lg:grid-cols-3">
            <UCard>
              <template #header>
                <span class="text-primary text-lg">Desayunos</span>
              </template>
              <URadioGroup
                v-model="breakfastQty"
                legend="Para cuantos días?"
                :options="breakfastOptions"
              />
            </UCard>
            <UCard>
              <template #header>
                <span class="text-primary text-lg">Comidas</span>
              </template>
              <URadioGroup v-model="lunchQty" legend="Para cuantos días?" :options="lunchOptions" />
            </UCard>
            <UCard>
              <template #header>
                <span class="text-primary text-lg">Cenas</span>
              </template>
              <URadioGroup
                v-model="dinnerQty"
                legend="Para cuantos días?"
                :options="dinnerOptions"
              />
            </UCard>
          </section>
        </section>

        <section class="flex justify-center">
          <UButton label="Ver resumen" @click="isOpen = true"></UButton>

          <USlideover v-model="isOpen" prevent-close>
            <UCard
              :ui="{
                header: { background: 'bg-gray-950' },
                body: { background: 'bg-[#f3f3f3]' },
                rounded: '',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between bg-gray-950 m-0">
                  <h3 class="text-xl font-semibold leading-6 text-primary">Resumen del pedido</h3>
                  <UButton
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1 text-white"
                    @click="isOpen = false"
                  />
                </div>
              </template>
              <div class="p-4 flex-1">
                <h3 class="text-xl text-primary-500">Estas son las comidas que recibirás</h3>
                <UAccordion
                  color="gray"
                  :items="items"
                  size="xl"
                  :ui="{
                    default: {
                      class: 'py-6 shadow mb-1.5 w-full text-2xl text-black hover:bg-white',
                      variant: 'soft',
                    },
                  }"
                >
                  <template #item="{ item }">
                    <ul class="px-2 mb-2">
                      <MealCourse
                        title="Desayuno"
                        :course="getMealtypeByDay(item.label, 'breakfast')"
                      />
                      <MealCourse title="Comida" :course="getMealtypeByDay(item.label, 'lunch')" />
                      <MealCourse title="Cena" :course="getMealtypeByDay(item.label, 'dinner')" />
                    </ul>
                  </template>
                </UAccordion>
              </div>
            </UCard>
          </USlideover>
        </section>
      </UForm>

      <div class="btm-nav pr-4">
        <button class="text-xl flex flex-row">
          <!-- <span>Calorías:</span>
          <span class="text-primary">9800</span> -->
        </button>

        <button class="text-xl flex flex-row">
          <span>Total:</span>
          <span class="text-primary">${{ orderTotal }}</span>
        </button>

        <button class="btn btn-primary flex-1" :disabled="orderTotal === 0">Ordenar</button>
      </div>
    </template>
  </MainSection>
</template>
