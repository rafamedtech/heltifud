<script setup lang="ts">
import type { DayWithMeals, Course } from '~/types/Menu';

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
const breakfastPrice = computed(() =>
  breakfastQty.value === '3' ? 400 : breakfastQty.value === '5' ? 600 : 0
);
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
const editLunchs = ref(false);
const lunchPrice = computed(() =>
  lunchQty.value === '3' ? 500 : lunchQty.value === '5' ? 700 : 0
);
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
const editDinners = ref(false);
const dinnerPrice = computed(() =>
  dinnerQty.value === '3' ? 450 : dinnerQty.value === '5' ? 650 : 0
);
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

const tabItems = [
  {
    label: 'Desayuno',

    slot: 'breakfast',
  },
  {
    label: 'Comida',
    slot: 'lunch',
  },
  {
    label: 'Cena',
    slot: 'dinner',
  },
];

const plans = ref([
  {
    name: `Plan de desayunos ${breakfastQty.value} días`,
    price: breakfastPrice.value,
  },
  {
    name: `Plan de comidas ${lunchQty.value} días`,
    description: 'Desayuno y comida',
    price: lunchPrice.value,
  },
  {
    name: `Plan de cenas ${dinnerQty.value} días`,
    description: 'Desayuno y cena',
    price: dinnerPrice.value,
  },
]);
const orderTotal = computed(() => {
  if (breakfastPrice.value + lunchPrice.value + dinnerPrice.value > 1900) {
    return 1900;
  } else {
    return breakfastPrice.value + lunchPrice.value + dinnerPrice.value;
  }
});

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
      <UForm :state="orderForm" class="space-y-4 pb-24">
        <!-- Contact info section -->
        <section class="flex flex-col gap-4 lg:w-1/2 px-2 lg:px-0 mb-8">
          <h3 class="text-2xl text-primary-500">Información de contacto</h3>
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

          <!-- Weeks menu slideover -->
          <section class="flex justify-center mb-4">
            <UButton label="Ver menú" @click="isOpen = true" size="lg">
              <template #trailing><Icon name="i-heroicons-arrow-right" size="20" /></template>
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
                    Puedes editar los platillo y/o agregar porciones extras del platillo,
                    guarniciones y proteína
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
                        <MealCourse
                          title="Comida"
                          :course="getMealtypeByDay(item.label, 'lunch')"
                        />
                        <MealCourse title="Cena" :course="getMealtypeByDay(item.label, 'dinner')" />
                      </ul>
                    </template>
                  </UAccordion>
                </div>
              </UCard>
            </USlideover>
          </section>

          <UTabs
            :items="tabItems"
            :default-index="1"
            :ui="{
              list: {
                background: 'bg-white',
                tab: {
                  size: 'text-lg',
                  active: 'bg-dark text-primary',
                },
              },
            }"
          >
            <template #breakfast>
              <UCard>
                <template #header>
                  <div class="flex justify-between items-center">
                    <span class="text-primary text-xl py-1.5">Detalle de desayunos</span>
                    <UButton
                      v-show="breakfastQty !== ''"
                      :label="editBreakfasts ? 'Ocultar' : 'Editar'"
                      :variant="editBreakfasts ? 'soft' : 'ghost'"
                      color="gray"
                      @click="() => (editBreakfasts = !editBreakfasts)"
                    >
                      <template #trailing
                        ><Icon
                          :name="
                            editBreakfasts
                              ? 'heroicons:eye-slash-solid'
                              : 'heroicons:pencil-square-solid'
                          "
                          size="20"
                      /></template>
                    </UButton>
                  </div>
                </template>
                <URadioGroup
                  v-model="breakfastQty"
                  legend="Para cuantos días?"
                  :options="breakfastOptions"
                  :ui="{ legend: 'text-base' }"
                  :ui-radio="{ label: 'text-base' }"
                />
                <template v-if="editBreakfasts && breakfastQty !== ''" #footer>
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
                            <USelectMenu :options="breakfastList" size="lg" />
                          </UFormGroup>
                        </div>
                      </template>
                    </UAccordion>
                  </section>
                </template>
              </UCard>
            </template>

            <template #lunch>
              <UCard>
                <template #header>
                  <div class="flex justify-between">
                    <span class="text-primary text-xl py-1.5">Detalle de comidas</span>
                    <UButton
                      v-show="lunchQty !== ''"
                      label="Editar"
                      variant="ghost"
                      color="gray"
                      @click="() => (editLunchs = !editLunchs)"
                    >
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
                <template v-if="editLunchs" #footer>
                  <section>
                    <h3 class="text-lg text-primary mb-4">Editar comidas</h3>
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
                            <USelectMenu :options="breakfastList" size="lg" />
                          </UFormGroup>
                        </div>
                      </template>
                    </UAccordion>
                  </section>
                </template>
              </UCard>
            </template>

            <template #dinner>
              <UCard>
                <template #header>
                  <div class="flex justify-between">
                    <span class="text-primary text-xl py-1.5">Detalle de cenas</span>
                    <UButton
                      v-show="dinnerQty !== ''"
                      label="Editar"
                      variant="ghost"
                      color="gray"
                      @click="() => (editDinners = !editDinners)"
                    >
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

                <template v-if="editDinners && dinnerQty !== ''" #footer>
                  <section>
                    <h3 class="text-lg text-primary mb-4">Editar comidas</h3>
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
                            <USelectMenu :options="breakfastList" size="lg" />
                          </UFormGroup>
                        </div>
                      </template>
                    </UAccordion>
                  </section>
                </template>
              </UCard>
            </template>
          </UTabs>
        </section>
      </UForm>

      <section class="fixed bg-dark w-full inset-x-0 bottom-0 py-4 flex justify-end">
        <div class="flex gap-2 text-primary pr-4 text-lg">
          <span class="text-white">Total:</span>
          <span class="font-bold">${{ orderTotal }}</span>
        </div>
      </section>
    </template>
  </MainSection>
</template>
