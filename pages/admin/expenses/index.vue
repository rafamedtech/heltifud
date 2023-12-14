<script setup lang="ts">
import type { Expense } from '@prisma/client';
import { transformPrice, dateOptions, expenseOptions, monthOptions } from '@/utils/helpers';
const isLoading = ref(true);

const { data: items } = await useFetch<Expense[]>('/api/expenses/all');

const monthFilter = ref('Todos');
const typeFilter = ref('Todas');
const categoryFilter = ref('Todas');

const categoryOptions = computed(() => {
  const filteredByType =
    typeFilter.value === 'Todas'
      ? items.value
      : items.value?.filter((item: Expense) => item.type === typeFilter.value);

  const filteredByTypeAndMonth =
    monthFilter.value === 'Todos'
      ? filteredByType
      : filteredByType?.filter((item: Expense) => {
          const itemDate = new Date(item.date as Date);
          const itemMonth = monthOptions[itemDate.getMonth() + 1];
          return itemMonth === monthFilter.value;
        });

  return ['Todas', ...new Set(filteredByTypeAndMonth?.map((item: Expense) => item.category))];
});

function filterItems(items: Expense[]) {
  return items.filter((item) => {
    const itemDate = new Date(item.date as Date);
    const itemMonth = monthOptions[itemDate.getMonth() + 1];

    return (
      (monthFilter.value === 'Todos' || itemMonth === monthFilter.value) &&
      (typeFilter.value === 'Todas' || item.type === typeFilter.value) &&
      (categoryFilter.value === 'Todas' || item.category === categoryFilter.value)
    );
  });
}

const filteredItems = computed(() => {
  return filterItems(items.value as Expense[]);
});

const totalIncome = computed(() => {
  return transformPrice(
    sumPrices(items.value?.filter((item: Expense) => item.type === 'Ingreso') as Expense[])
  );
});

const totalExpense = computed(() => {
  return transformPrice(
    sumPrices(items.value?.filter((item: Expense) => item.type === 'Gasto') as Expense[])
  );
});

const totalBalance = computed(() =>
  transformPrice(
    sumPrices(items.value?.filter((item: Expense) => item.type === 'Ingreso') as Expense[]) -
      sumPrices(items.value?.filter((item: Expense) => item.type === 'Gasto') as Expense[])
  )
);

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
      <section class="flex flex-col lg:grid justify-center">
        <Stats>
          <Stat icon="icon-park-outline:paper-money-two" title="Ingresos">
            {{ totalIncome }}
          </Stat>
          <Stat icon="icon-park-outline:paper-money-two" title="Gastos">
            {{ totalExpense }}
          </Stat>
          <Stat icon="icon-park-outline:balance-two" title="Balance">
            {{ totalBalance }}
          </Stat>
        </Stats>
      </section>

      <section class="flex justify-center py-4">
        <NuxtLink to="/admin/expenses/new" class="btn mt-4 lg:w-52 normal-case btn-primary">
          Nueva entrada
        </NuxtLink>
      </section>
      <section
        class="grid lg:grid-cols-1 gap-8 max-w-3xl mx-auto text-base-100 justify-between mt-8"
      >
        <div>
          <h3 class="text-2xl text-primary">Filtros</h3>
          <section class="flex gap-2 mt-2 justify-between">
            <BaseSelect
              label="Mes"
              :items="monthOptions"
              v-model="monthFilter"
              class="min-w-fit w-full"
            />

            <BaseSelect
              label="Tipo"
              :items="expenseOptions"
              v-model="typeFilter"
              class="min-w-fit w-full"
            />
            <BaseSelect
              label="Categoría"
              :items="categoryOptions"
              v-model="categoryFilter"
              class="min-w-fit w-full"
            />
          </section>
          <table class="hidden lg:table text-base-300 mt-8">
            <!-- head -->
            <TableHead />
            <tbody>
              <!-- row 1 -->
              <tr v-for="{ id, date, concept, price, category } in filteredItems" :key="id">
                <th>{{ new Date(date as Date).toLocaleDateString('es-MX', dateOptions) }}</th>
                <td>{{ concept }}</td>
                <td>{{ category }}</td>
                <td>
                  {{ transformPrice(price) }}
                </td>
                <td>
                  <NuxtLink to="/"
                    ><Icon name="icon-park-outline:arrow-circle-right" size="24"
                  /></NuxtLink>
                </td>
              </tr>

              <tr v-if="!filteredItems?.length">
                <td>No hay resultados</td>
              </tr>

              <tr>
                <th></th>
                <td></td>
                <td class="text-end font-bold text-primary">Total:</td>
                <td class="font-bold">
                  {{ transformPrice(sumPrices(filteredItems as Expense[])) }}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <section class="flex flex-col gap-4 mt-8 lg:hidden">
            <ExpenseCard v-for="expense in filteredItems" :expense="expense" :key="expense.id" />
          </section>
        </div>
      </section>
    </template>
  </MainSection>
</template>
