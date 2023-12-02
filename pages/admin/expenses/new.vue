<script setup lang="ts">
const isLoading = ref(true);
const btnLoading = ref(false);

const expenseTypes = ref<string[]>(['Gasto', 'Ingreso']);

const expense = reactive<Expense>({
  date: new Date(Date.now()),
  type: 'Gasto',
  concept: '',
  price: 0,
  category: '',
  ticket: '',
});

const { concept, type, price, category, ticket } = toRefs<Expense>(expense);

async function submitExpense() {
  btnLoading.value = true;

  try {
    await $fetch(`/api/expenses/new`, {
      method: 'POST',
      body: { expense },
    });

    await navigateTo('/admin/expenses');
  } catch (error) {
    console.error(error);
  }

  setTimeout(() => {
    btnLoading.value = false;
  }, 2000);
}

function isNumber(evt: KeyboardEvent): void {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const keyPressed: string = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
}

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Capturar nuevo gasto/ingreso" />
    </template>
    <template #content>
      <form class="max-w-md lg:mx-auto flex flex-col gap-4" @submit.prevent="submitExpense">
        <BaseInput label="Concepto" v-model="concept" />
        <BaseSelect label="Tipo de entrada" :items="expenseTypes" v-model="type" />
        <BaseInput
          label="Cantidad"
          type="number"
          v-model.number="price"
          @keypress="isNumber($event)"
        />
        <BaseInput label="Categoría" v-model="category" />
        <BaseInput label="Ticket" v-model="ticket" />
        <section class="flex justify-center">
          <BaseButton type="primary" :loading="btnLoading">Guardar</BaseButton>
        </section>
      </form>
    </template>
  </MainSection>
</template>
