<script setup lang="ts">
import type { DayWithMeals, Course, Order, OrderPlan } from '@/types/Menu';
import type { FormError, FormSubmitEvent } from '#ui/types';

const { data: days } = await useFetch<DayWithMeals[] | null>('/api/menu');

const items = ref(
  days.value?.map((day: DayWithMeals) => ({
    label: day.name,
  }))
);

const getMealtypeByDay = (dayName: string, type: string): Course => {
  const day = days.value?.find((day: DayWithMeals) => day.name === dayName);
  return type === 'breakfast' ? day?.breakfast : type === 'lunch' ? day?.lunch : day?.dinner || [];
};

const isLoading = ref(true);
const btnLoading = ref(false);
const isOpen = ref(false);
const openModal = ref(false);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: 'name', message: 'Required' });
  return errors;
};

// Breakfast state
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
const breakfastList = computed(() => getMealNamesForWeek(days.value, 'breakfast'));

const breakfastPlan = computed(() => {
  const planName =
    breakfastQty.value === '3'
      ? 'Plan 3 days'
      : breakfastQty.value === '5'
        ? 'Plan 5 days'
        : 'No plan';
  const meals = days.value
    ?.slice(0, parseInt(breakfastQty.value))
    .map((day) => ({ ...day, lunch: undefined, dinner: undefined }));

  return {
    name: planName,
    price: breakfastPrice.value,
    meals,
  };
});

function createMealPlan(mealType: 'desayunos' | 'comidas' | 'cenas'): OrderPlan {
  const mealQty =
    mealType === 'desayunos'
      ? breakfastQty.value
      : mealType === 'comidas'
        ? lunchQty.value
        : dinnerQty.value;
  const mealPrice =
    mealType === 'desayunos'
      ? breakfastPrice.value
      : mealType === 'comidas'
        ? lunchPrice.value
        : dinnerPrice.value;
  const planName =
    mealQty === '3'
      ? `Plan de ${mealType} (3 días)`
      : mealQty === '5'
        ? `Plan de ${mealType} (5 días)`
        : 'No plan';
  const meals = days.value?.slice(0, parseInt(mealQty)).map((day) => {
    if (mealType === 'desayunos') {
      return { ...day, lunch: undefined, dinner: undefined };
    } else if (mealType === 'comidas') {
      return { ...day, breakfast: undefined, dinner: undefined };
    } else {
      return { ...day, breakfast: undefined, lunch: undefined };
    }
  });
  // .map((day) => ({ ...day, breakfast: undefined, dinner: undefined }));

  return {
    name: planName,
    price: mealPrice,
    meals,
  };
}

// watch(breakfastQty, (newValue, oldValue) => {
//   const oldPlanName = `Plan de desayunos (${oldValue} días)`;
//   // Remove the old plan if it exists
//   const oldPlanIndex = plans.value.findIndex((plan: OrderPlan) => plan.name === oldPlanName);
//   if (oldPlanIndex !== -1) {
//     plans.value.splice(oldPlanIndex, 1);
//   }
//   // Add the existing breakfastPlan if the new value is not an empty string
//   if (newValue) {
//     // breakfastPlan.value.name = `Plan de desayunos (${newValue} días)`;
//     plans.value.push(createMealPlan('desayunos'));
//   }
// });

function getMealNamesForWeek(
  days: DayWithMeals[] | null,
  mealType: 'breakfast' | 'lunch' | 'dinner'
): string[] {
  return days?.flatMap((day) => day?.[mealType]).map((meal) => meal?.name) as string[];
}

// lunch state
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

// watch(lunchQty, (newValue, oldValue) => {
//   const oldPlanName = `Plan de comidas (${oldValue} días)`;
//   // Remove the old plan if it exists
//   const oldPlanIndex = plans.value.findIndex((plan: any) => plan.name === oldPlanName);
//   if (oldPlanIndex !== -1) {
//     plans.value.splice(oldPlanIndex, 1);
//   }
//   // Add the existing breakfastPlan if the new value is not an empty string
//   if (newValue) {
//     breakfastPlan.value.name = `Plan de desayunos (${newValue} días)`;
//     plans.value.push(breakfastPlan.value as never);
//   }
// });

// dinner state
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
// watch(dinnerQty, (newValue, oldValue) => {
//   const planName = `Plan de cenas (${oldValue} días)`;
//   // Remove the old plan if it exists
//   const oldPlanIndex = plans.value.findIndex((plan: any) => plan.name === planName);
//   if (oldPlanIndex !== -1) {
//     plans.value.splice(oldPlanIndex, 1);
//   }
//   // Add a new plan if the new value is not an empty string
//   if (newValue) {
//     plans.value.push({
//       name: `Plan de cenas (${newValue} días)`,
//       price: dinnerPrice.value,
//     });
//   }
// });

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

function handleWatch(oldValue: any, newValue: any, mealType: 'desayunos' | 'comidas' | 'cenas') {
  // console.log({
  //   oldValue,
  //   newValue,
  //   mealType,
  // });
  const oldPlanName = `Plan de ${mealType} (${oldValue} días)`;
  // Remove the old plan if it exists
  const oldPlanIndex = plans.value.findIndex((plan: any) => plan.name === oldPlanName);
  if (oldPlanIndex !== -1) {
    plans.value.splice(oldPlanIndex, 1);
  }
  // Add the existing breakfastPlan if the new value is not an empty string
  if (newValue) {
    plans.value.push(createMealPlan(mealType));
  }
}
watch([breakfastQty, lunchQty, dinnerQty], (oldValue, newValue) => {
  // get the property index that changed
  const changedProp = Object.keys(newValue).findIndex(
    (key: any) => newValue[key] !== oldValue[key]
  );

  // get the meal type
  const mealType = changedProp === 0 ? 'desayunos' : changedProp === 1 ? 'comidas' : 'cenas';

  // run the handlwatch function
  handleWatch(newValue[changedProp], oldValue[changedProp], mealType);
});

const plans = ref<OrderPlan[]>([]);

const orderTotal = computed(() => {
  return plans.value.reduce((acc, plan) => acc + plan.price, 0);
});

const orderForm = reactive<Order>({
  name: '',
  phone: '',
  address: '',
  plans: plans.value,
  total: 0,
});

watch(orderForm, (oldValue, newValue) => {
  console.log(newValue, orderTotal.value);
});

function createOrder(event: FormSubmitEvent<any>) {
  btnLoading.value = true;
  setTimeout(() => {
    btnLoading.value = false;
    return navigateTo('/confirmacion');
  }, 2000);
}

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading
        title="Ingresar una orden"
        description="Llena todos los campos y elige por lo menos un plan para ingresar un pedido"
      />
    </template>

    <template #content>
      <UForm :state="orderForm" :validate="validate" class="space-y-4 pb-24 lg:pb-0">
        <!-- Contact info section -->
        <section class="lg:flex lg:justify-between lg:gap-8">
          <UCard :ui="{ base: 'w-full' }">
            <template #header>
              <h3 class="text-2xl text-primary-500 lg:text-xl">Información de contacto</h3>
            </template>

            <section class="min-h-[15rem] flex flex-col justify-between gap-4">
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
          </UCard>

          <!-- Order summary (Desktop only) -->
          <section class="hidden lg:block w-full max-w-lg">
            <UCard :iu="{ base: 'min-h-[20rem]' }">
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="text-xl text-primary">Resumen del pedido</span>
                  <!-- <UButton
                    variant="ghost"
                    size="lg"
                    color="gray"
                    @click="() => (openModal = !openModal)"
                  >
                    <template #trailing
                      ><Icon name="i-heroicons-pencil-square-solid" size="20"
                    /></template>
                    <span>Editar</span>
                  </UButton> -->
                </div>
              </template>

              <div class="min-h-[15rem]">
                <h3 class="text-xl mb-4">Planes</h3>
                <section class="flex flex-col min-h-[5rem]" v-if="plans.length">
                  <span class="text-base font-bold" v-for="plan in plans">{{ plan.name }}</span>
                </section>

                <section v-else class="flex justify-center min-h-[5rem] items-center">
                  <span>No hay Planes agregados</span>
                </section>

                <span class="font-bold text-2xl text-center block my-8"
                  >Tu total es: <span class="text-primary">${{ orderTotal }}</span></span
                >
                <section class="flex justify-center">
                  <UButton
                    size="lg"
                    :label="btnLoading ? 'Creando pedido...' : 'Crear pedido'"
                    :loading="btnLoading"
                    @click="createOrder"
                    :disabled="!plans.length"
                  />
                </section>
              </div>
            </UCard>
          </section>
        </section>

        <!-- Plans section -->
        <section class="flex flex-col gap-2 px-2 lg:px-0 lg:pt-4">
          <h3 class="text-2xl text-primary-500">Elige tus planes</h3>
          <p class="mb-4 text-sm">
            Puedes elegir las recomendaciones de la semana o editar cada tipo de comida con el botón
            editar
          </p>

          <!-- Weeks menu slideover -->
          <section class="flex justify-center mb-4">
            <UButton
              label="Ver menú"
              @click="isOpen = true"
              size="lg"
              color="black"
              :ui="{ color: { black: { solid: 'text-primary' } } }"
            />

            <USlideover v-model="isOpen" prevent-close>
              <UCard
                :ui="{
                  base: 'overflow-auto',
                  header: { background: 'bg-gray-950' },
                  body: { background: 'bg-[#f3f3f3] min-h-screen' },
                  rounded: '',
                }"
              >
                <template #header>
                  <div class="flex items-center justify-between bg-gray-950 m-0">
                    <h3 class="text-xl font-semibold leading-6 text-primary">Menú de la semana</h3>
                    <UButton
                      variant="ghost"
                      icon="i-heroicons-x-mark-20-solid"
                      class="-my-1 text-primary"
                      @click="isOpen = false"
                    />
                  </div>
                </template>
                <div class="p-4 flex-1 mb-24">
                  <h3 class="text-xl mb-8">
                    Este es el menú correspondiente a la semana del 1-5 de Enero
                  </h3>
                  <!-- <p class="mb-8 text-sm">
                    Puedes editar los platillo y/o agregar porciones extras del platillo,
                    guarniciones y proteína
                  </p> -->
                  <UAccordion
                    color="gray"
                    :items="items"
                    size="xl"
                    :ui="{
                      default: {
                        class: ' shadow mb-1.5 w-full text-2xl text-black hover:bg-white',
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
              wrapper: 'container max-w-screen-sm',
              list: {
                background: 'bg-white border',
                tab: {
                  size: 'text-lg',
                  active: 'bg-primary text-white',
                },
              },
            }"
          >
            <template #breakfast>
              <UCard>
                <template #header>
                  <div class="flex justify-between items-center">
                    <span class="text-primary text-xl py-1.5">Detalle de desayunos</span>
                    <!-- <UButton
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
                    </UButton> -->
                  </div>
                </template>
                <URadioGroup
                  v-model="breakfastQty"
                  legend="Para cuantos días?"
                  :options="breakfastOptions"
                  :ui="{ legend: 'text-lg' }"
                  :ui-radio="{ label: 'text-lg' }"
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
                    <!-- <UButton
                      v-show="lunchQty !== ''"
                      label="Editar"
                      variant="ghost"
                      color="gray"
                      @click="() => (editLunchs = !editLunchs)"
                    >
                      <template #trailing><Icon name="i-heroicons-pencil-square-solid" /></template>
                    </UButton> -->
                  </div>
                </template>

                <URadioGroup
                  v-model="lunchQty"
                  legend="Para cuantos días?"
                  :options="lunchOptions"
                  :ui="{ legend: 'text-lg' }"
                  :ui-radio="{
                    label: 'text-lg',
                  }"
                />

                <template v-if="editLunchs && lunchQty !== ''" #footer>
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
                    <!-- <UButton
                      v-show="dinnerQty !== ''"
                      label="Editar"
                      variant="ghost"
                      color="gray"
                      @click="() => (editDinners = !editDinners)"
                    >
                      <template #trailing><Icon name="i-heroicons-pencil-square-solid" /></template>
                    </UButton> -->
                  </div>
                </template>
                <URadioGroup
                  v-model="dinnerQty"
                  legend="Para cuantos días?"
                  :options="dinnerOptions"
                  :ui="{ legend: 'text-lg' }"
                  :ui-radio="{
                    label: 'text-lg',
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

      <section
        class="fixed bg-dark w-full inset-x-0 bottom-0 py-4 flex justify-between px-4 lg:hidden"
      >
        <div class="flex gap-2 text-primary text-lg py-1.5">
          <span class="text-white">Total:</span>
          <span class="font-bold">${{ orderTotal }}</span>
        </div>
        <div class="flex gap-2">
          <UButton
            label="Ver resumen"
            @click="openModal = true"
            variant="outline"
            v-show="plans.length && orderForm.name && orderForm.phone && orderForm.address"
          />

          <UButton
            type="submit"
            size="lg"
            :label="btnLoading ? 'Creando' : 'Crear pedido'"
            :loading="btnLoading"
            @click="createOrder"
            :disabled="
              !plans.length ||
              orderForm.name === '' ||
              orderForm.phone === '' ||
              orderForm.address === ''
            "
          />
        </div>
      </section>

      <UModal v-model="openModal">
        <div class="p-4">
          <UCard>
            <template #header>
              <div class="flex justify-between items-center">
                <span class="text-xl py-1.5">Resumen del pedido</span>
                <UButton
                  variant="ghost"
                  size="lg"
                  color="gray"
                  @click="() => (openModal = !openModal)"
                >
                  <template #trailing
                    ><Icon name="i-heroicons-pencil-square-solid" size="20"
                  /></template>
                  <span>Editar</span>
                </UButton>
              </div>
            </template>

            <div class="p-4">
              <section>
                <h3 class="text-xl text-primary mb-4">Información de contacto</h3>
                <div class="flex flex-col mb-2">
                  <span class="text-base">Tu nombre:</span>
                  <span class="text-lg font-bold capitalize">{{ orderForm.name }}</span>
                </div>

                <div class="flex flex-col mb-2">
                  <span class="text-base">Teléfono:</span>
                  <span class="text-lg font-bold">{{ orderForm.phone }}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-base">Domicilio de entrega:</span>
                  <span class="text-lg font-bold">{{ orderForm.address }}</span>
                </div>
              </section>

              <h3 class="text-xl text-primary mt-8 mb-4">Planes</h3>
              <section class="flex justify-between gap-8" v-for="plan in plans">
                <span class="text-base font-bold">{{ plan.name }}</span>
              </section>

              <span class="font-bold text-2xl text-center block mt-8"
                >Tu total es: <span class="text-primary">${{ orderTotal }}</span></span
              >
            </div>
          </UCard>
        </div>
      </UModal>
    </template>
  </MainSection>
</template>
