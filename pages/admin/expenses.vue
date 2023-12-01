<script setup lang="ts">
const isLoading = ref(true);

const items = ref([
  {
    id: 1,
    date: '19/11/2023',
    type: 'ingreso',
    concept: 'Comidas Ricardo',
    price: 1000,
    category: 'Venta',
    ticket: '',
  },
  {
    id: 2,
    date: '19/11/2023',
    type: 'gasto',
    concept: 'Insumos 19/11/2023',
    price: 616,
    category: 'Insumos',
    ticket: '',
  },
  {
    id: 3,
    date: '19/11/2023',
    type: 'gasto',
    concept: 'Pago Aby 19/11/2023',
    price: 700,
    category: 'Sueldo',
    ticket: '',
  },
  {
    id: 4,
    date: '19/11/2023',
    type: 'ingreso',
    concept: '',
    price: 0,
    category: '',
    ticket: '',
  },
  {
    id: 5,
    date: '19/11/2023',
    type: 'gasto',
    concept: '',
    price: 0,
    category: '',
    ticket: '',
  },
]);

const income = computed(() => {
  return items.value.filter((item) => item.type === 'ingreso');
});

const expenses = computed(() => {
  return items.value.filter((item) => item.type === 'gasto');
});

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Control de gastos" />
    </template>
    <template #content>
      <section class="flex flex-col lg:flex-row justify-center gap-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-base-100">Selecciona un mes</span>
          </label>
          <select class="select select-bordered">
            <option>Enero</option>
            <option>Febrero</option>
          </select>
        </div>
        <section class="stats shadow bg-white text-base-100">
          <div class="stat">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:balance-two" size="32" />
            </div>
            <div class="stat-title text-base-100">Balance</div>
            <div class="stat-value">1,200</div>
          </div>
        </section>
        <section class="stats w-full lg:max-w-xl mx-auto bg-white text-base-100 shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:paper-money-two" size="32" />
            </div>
            <div class="stat-title text-base-100">Ingresos</div>
            <div class="stat-value">31K</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:mall-bag" size="32" />
            </div>
            <div class="stat-title text-base-100">Gastos</div>
            <div class="stat-value">4,200</div>
          </div>
        </section>
      </section>
      <section class="flex text-base-100 justify-between mt-8">
        <div class="overflow-x-auto">
          <h3 class="text-xl">Ingresos</h3>
          <table class="table">
            <!-- head -->
            <thead class="text-primary">
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Cantidad</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="expense in income" :key="expense.id">
                <th>{{ expense.date }}</th>
                <td>{{ expense.concept }}</td>
                <td>${{ expense.price }}</td>
                <td>{{ expense.category }}</td>
              </tr>

              <tr>
                <th></th>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">$1000</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="overflow-x-auto">
          <h3 class="text-xl">Gastos</h3>
          <table class="table">
            <!-- head -->
            <thead class="text-primary">
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Cantidad</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="expense in expenses" :key="expense.id">
                <th>{{ expense.date }}</th>
                <td>{{ expense.concept }}</td>
                <td>${{ expense.price }}</td>
                <td>{{ expense.category }}</td>
              </tr>

              <tr>
                <th></th>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">$1000</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </MainSection>
</template>
