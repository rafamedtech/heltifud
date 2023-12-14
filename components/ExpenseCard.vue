<script setup lang="ts">
import type { Expense } from '@prisma/client';

defineProps<{
  expense: Expense;
}>();

const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

function transformPrice(item: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(item);
}
</script>

<template>
  <div class="collapse lg:max-w-lg card rounded-lg bg-white shadow">
    <input type="radio" name="my-accordion-1" />
    <div class="collapse-title text-xl font-medium pr-4">
      <h2 class="card-title text-base-300 text-lg flex justify-between">
        {{ expense.concept }}
        <span class="badge min-w-fit">{{
          new Date(expense.date as Date).toLocaleDateString('es-MX', dateOptions)
        }}</span>
      </h2>
    </div>
    <div class="collapse-content lg:text-xs grid">
      <section>
        <p class="text-primary">
          Categoría: <span class="text-base-300">{{ expense.category }}</span>
        </p>
        <p class="text-primary">
          Tipo: <span class="text-base-300">{{ expense.type }}</span>
        </p>
        <p class="text-primary">
          Costo: <span class="text-base-300">{{ transformPrice(expense.price) }}</span>
        </p>
      </section>
      <section>
        <p class="text-primary">Ticket</p>
        <img v-if="expense.ticket" :src="expense.ticket" alt="Ticket" />
        <div
          v-else
          class="text-base-300 w-full text-center my-auto h-16 flex items-center justify-center"
        >
          <p>No hay imagen</p>
        </div>
      </section>
    </div>
  </div>
</template>
