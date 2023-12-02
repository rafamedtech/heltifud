<script setup lang="ts">
import type { Expense } from '@prisma/client';
const isLoading = ref(true);
const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

const { data: items } = await useFetch<Expense[]>('/api/expenses/all');

const income = computed(() => {
  return items.value?.filter((item) => item.type === 'Ingreso') as Expense[];
});

const expenses = computed(() => {
  return items.value?.filter((item) => item.type === 'Gasto') as Expense[];
});

const totalExpenses = computed(() =>
  transformPrice(sumPrices(income.value as Expense[]) - sumPrices(expenses.value as Expense[]))
);

function transformPrice(item: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(item);
}

const sumPrices = (items: Expense[]): number => {
  return items.reduce((total, item: Expense) => total + item.price, 0);
};

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
            <div class="stat-value">{{ totalExpenses }}</div>
          </div>
        </section>
        <section class="stats w-full lg:max-w-xl mx-auto bg-white text-base-100 shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:paper-money-two" size="32" />
            </div>
            <div class="stat-title text-base-100">Ingresos</div>
            <div class="stat-value">{{ transformPrice(sumPrices(income)) }}</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:mall-bag" size="32" />
            </div>
            <div class="stat-title text-base-100">Gastos</div>
            <div class="stat-value">{{ transformPrice(sumPrices(expenses)) }}</div>
          </div>
        </section>
      </section>
      <section class="grid lg:grid-cols-2 text-base-100 justify-between mt-8">
        <div class="overflow-x-auto">
          <h3 class="text-xl">Ingresos</h3>
          <table class="table">
            <TableHead />
            <tbody>
              <tr v-for="{ id, date, concept, price, category } in income" :key="id">
                <th>{{ new Date(date as Date).toLocaleDateString('es-MX', dateOptions) }}</th>
                <td>{{ concept }}</td>
                <td>
                  {{ transformPrice(price) }}
                </td>
                <td>{{ category }}</td>
              </tr>

              <tr>
                <th></th>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">{{ transformPrice(sumPrices(income)) }}</td>
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
            <TableHead />
            <tbody>
              <!-- row 1 -->
              <tr v-for="{ id, date, concept, price, category } in expenses" :key="id">
                <th>{{ new Date(date as Date).toLocaleDateString('es-MX', dateOptions) }}</th>
                <td>{{ concept }}</td>
                <td>
                  {{
                    new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(price)
                  }}
                </td>
                <td>{{ category }}</td>
              </tr>

              <tr>
                <th></th>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">{{ transformPrice(sumPrices(expenses)) }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </MainSection>
</template>
