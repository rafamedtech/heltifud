<script setup lang="ts">
import type { DayWithMeals, Course, MealType } from '~/types/Menu';

const { data: days } = await useFetch<DayWithMeals[] | null>('/api/menu');

const items = days.value?.map((day: DayWithMeals) => ({
  label: day.name,
}));

const getMealtypeByDay = (dayName: string, type: string): Course => {
  const day = days.value?.find((day: DayWithMeals) => day.name === dayName);
  return type === 'breakfast' ? day?.breakfast : type === 'lunch' ? day?.lunch : day?.dinner || [];
};

const isLoading = ref(true);
const isOpen = ref(false);

const orderForm = reactive({
  name: 'Rafael Valenzuela',
  phone: '6642591920',
  address: 'San Patricio 6109, H14, Santa Fe I',
});

const breakfastQty = ref('');
const editBreakfasts = ref(false);
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

const getMealNamesForWeek = (
  days: DayWithMeals[] | null,
  mealType: 'breakfast' | 'lunch' | 'dinner'
): string[] => {
  return days?.flatMap((day) => day?.[mealType]).map((meal) => meal?.name) as string[];
};
const breakfastList = computed(() => getMealNamesForWeek(days.value, 'breakfast'));

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
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading
        title="Ingresar una orden"
        description="Elige la cantidad de días y platillos que deseas ordenar"
      />
    </template>
    <template #content>
      <UForm :state="orderForm" class="space-y-4">
        <!-- Contact info section -->
        <section class="flex flex-col gap-4 lg:w-1/2 px-2 lg:px-0 mb-8">
          <h3 class="text-xl text-primary-500">Información de contacto</h3>
          <UFormGroup label="Tu nombre">
            <UInput v-model="orderForm.name" size="xl" />
          </UFormGroup>

          <UFormGroup label="Teléfono">
            <UInput v-model="orderForm.phone" size="xl" />
          </UFormGroup>
          <UFormGroup label="Domicilio de entrega">
            <UInput v-model="orderForm.address" size="xl" />
          </UFormGroup>
        </section>

        <!-- Plans section -->
        <section class="flex flex-col gap-2 px-2 lg:px-0">
          <h3 class="text-2xl text-primary-500">Elige tus planes</h3>
          <p class="mb-4 text-sm">
            Puedes elegir las recomendaciones de la semana o editar cada tipo de comida con el botón
            editar
          </p>
          <section class="lg:px-0 flex flex-col gap-4 lg:grid lg:grid-cols-3">
            <UCard>
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="text-primary text-xl py-1.5">Desayunos</span>
                  <UButton
                    v-show="breakfastQty !== ''"
                    label="Editar"
                    variant="ghost"
                    color="gray"
                    @click="() => (editBreakfasts = !editBreakfasts)"
                  >
                    <template #trailing><Icon name="i-heroicons-pencil-square-solid" /></template>
                  </UButton>
                </div>
              </template>
              <URadioGroup
                v-model="breakfastQty"
                legend="Para cuantos días?"
                :options="breakfastOptions"
                :ui="{ legend: 'text-base' }"
                :ui-radio="{
                  label: 'text-base',
                }"
              />
              <template v-if="editBreakfasts" #footer>
                <section>
                  <h3 class="text-lg text-primary mb-4">Editar desayunos</h3>
                  <UAccordion
                    color="gray"
                    :items="items"
                    size="xl"
                    :ui="{
                      default: {
                        class: ' shadow mb-1.5 w-full text-2xl text-black ',
                        variant: 'soft',
                      },
                    }"
                  >
                    <template #item="{ item }">
                      <div v-for="meal in getMealtypeByDay(item.label, 'breakfast')">
                        <UFormGroup label="Platillo principal">
                          <USelectMenu :options="breakfastList" />
                        </UFormGroup>
                      </div>
                      <!-- <ul class="px-2 mb-2">
                        <MealCourse
                          title="Desayuno"
                          :course="getMealtypeByDay(item.label, 'breakfast')"
                        />
                        <MealCourse
                          title="Comida"
                          :course="getMealtypeByDay(item.label, 'lunch')"
                        />
                        <MealCourse title="Cena" :course="getMealtypeByDay(item.label, 'dinner')" />
                      </ul> -->
                    </template>
                  </UAccordion>
                </section>
              </template>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex justify-between">
                  <span class="text-primary text-xl py-1.5">Comidas</span>
                  <UButton v-show="lunchQty !== ''" label="Editar" variant="ghost" color="gray">
                    <template #trailing><Icon name="i-heroicons-pencil-square-solid" /></template>
                  </UButton>
                </div>
              </template>
              <URadioGroup
                v-model="lunchQty"
                legend="Para cuantos días?"
                :options="lunchOptions"
                :ui="{ legend: 'text-base' }"
                :ui-radio="{
                  label: 'text-base',
                }"
              />
            </UCard>
            <UCard>
              <template #header>
                <div class="flex justify-between">
                  <span class="text-primary text-xl py-1.5">Cenas</span>
                  <UButton v-show="dinnerQty !== ''" label="Editar" variant="ghost" color="gray">
                    <template #trailing><Icon name="i-heroicons-pencil-square-solid" /></template>
                  </UButton>
                </div>
              </template>
              <URadioGroup
                v-model="dinnerQty"
                legend="Para cuantos días?"
                :options="dinnerOptions"
                :ui="{ legend: 'text-base' }"
                :ui-radio="{
                  label: 'text-base',
                }"
              />
            </UCard>
          </section>
        </section>

        <!-- Weeks menu slideover -->
        <section class="flex justify-center">
          <UButton label="Editar mis comidas" @click="isOpen = true">
            <template #trailing><Icon name="i-heroicons-arrow-right" size="24" /></template>
          </UButton>

          <USlideover v-model="isOpen" prevent-close>
            <UCard
              :ui="{
                header: { background: 'bg-gray-950' },
                body: { base: ' overflow-y-scroll', background: 'bg-[#f3f3f3]' },
                rounded: '',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between bg-gray-950 m-0">
                  <h3 class="text-xl font-semibold leading-6 text-primary">
                    Resumen de mis comidas
                  </h3>
                  <UButton
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1 text-primary"
                    @click="isOpen = false"
                  />
                </div>
              </template>
              <div class="p-4 flex-1 mb-24">
                <h3 class="text-xl text-primary-500">Estas son las comidas que recibirás</h3>
                <p class="mb-8 text-sm">
                  Puedes editar los platillo y/o agregar porciones extras del platillo, guarniciones
                  y proteína
                </p>
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
    </template>
  </MainSection>
</template>
