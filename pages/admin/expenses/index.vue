<script setup lang="ts">
import type { Expense } from '@prisma/client';
const isLoading = ref(true);
const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

const { data: items } = await useFetch<Expense[]>('/api/expenses/all');

const expenseFilter = ref('Ingreso');
const expenseOptions = ['Todas', 'Gasto', 'Ingreso'];

const filteredItems = computed(() => {
  if (expenseFilter.value === 'Todas') {
    // If filter is 'Todas', return all items
    return items.value;
  } else {
    // Otherwise, filter items based on the specified category
    return items.value?.filter((item: Expense) => item.type === expenseFilter.value) as Expense[];
  }
});

const totalExpenses = computed(() =>
  transformPrice(
    sumPrices(filteredItems.value as Expense[]) - sumPrices(filteredItems.value as Expense[])
  )
);

function transformPrice(item: number): string {
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

definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Control de gastos" />
    </template>
    <template #content>
      <section class="flex flex-col lg:grid justify-center gap-4">
        <!-- <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-base-100">Selecciona un mes</span>
          </label>
          <select class="select select-bordered">
            <option>Enero</option>
            <option>Febrero</option>
          </select>
        </div> -->

        <section
          class="stats stats-vertical lg:stats-horizontal w-full mx-auto bg-white text-base-300 shadow"
        >
          <div class="stat p-4">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:paper-money-two" size="32" />
            </div>
            <div class="stat-title text-base-300">Ingresos</div>
            <div class="stat-value">
              {{ transformPrice(sumPrices(filteredItems as Expense[])) }}
            </div>
          </div>

          <div class="stat p-4">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:mall-bag" size="32" />
            </div>
            <div class="stat-title text-base-300">Gastos</div>
            <div class="stat-value">
              {{ transformPrice(sumPrices(items)) }}
            </div>
          </div>

          <div class="stat p-4">
            <div class="stat-figure text-primary">
              <Icon name="icon-park-outline:balance-two" size="32" />
            </div>
            <div class="stat-title text-base-300">Balance</div>
            <div class="stat-value">{{ totalExpenses }}</div>
          </div>
        </section>
        <!-- 
        <section class="flex flex-col gap-4">

        </section> -->
      </section>

      <section class="flex justify-center py-4">
        <NuxtLink to="/admin/expenses/new" class="btn mt-4 lg:w-52 normal-case btn-primary">
          <!-- <BaseButton type="primary">Nueva entrada</BaseButton> -->Nueva entrada
        </NuxtLink>
      </section>
      <section
        class="grid lg:grid-cols-1 gap-8 max-w-2xl mx-auto text-base-100 justify-between mt-8"
      >
        <div>
          <h3 class="text-2xl text-primary">Filtros</h3>
          <section class="flex gap-2 mt-2 justify-between">
            <BaseSelect
              label="Mes"
              :items="expenseOptions"
              v-model="expenseFilter"
              class="min-w-fit w-full"
            />

            <BaseSelect
              label="Tipo"
              :items="expenseOptions"
              v-model="expenseFilter"
              class="min-w-fit w-full"
            />
            <BaseSelect
              label="Categoría"
              :items="expenseOptions"
              v-model="expenseFilter"
              class="min-w-fit w-full"
            />
          </section>
          <table class="table text-base-300 mt-8">
            <!-- head -->
            <TableHead />
            <tbody>
              <!-- row 1 -->
              <tr v-for="{ id, date, concept, price, category } in filteredItems" :key="id">
                <th>{{ new Date(date as Date).toLocaleDateString('es-MX', dateOptions) }}</th>
                <td>{{ concept }}</td>
                <td>
                  {{ transformPrice(price) }}
                </td>
                <td>{{ category }}</td>
              </tr>

              <tr v-if="!filteredItems?.length">
                <td>No hay resultados</td>
              </tr>

              <tr>
                <th></th>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">
                  {{ transformPrice(sumPrices(filteredItems as Expense[])) }}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </MainSection>
</template>
