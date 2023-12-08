<script setup lang="ts">
const store = useMainStore();
const { ticketUrl } = storeToRefs(store);

const isLoading = ref(true);
const btnLoading = ref(false);

const expenseTypes = ref<string[]>(['Gasto', 'Ingreso']);

const expense = reactive<ExpenseOutline>({
  date: new Date(Date.now()),
  type: 'Gasto',
  concept: '',
  price: 0,
  category: '',
  ticket: ticketUrl.value,
});

const { concept, type, price, category, ticket } = toRefs<ExpenseOutline>(expense);

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

definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Detalles de la entrada" />
    </template>
    <template #content>
      <section class="bg-white flex lg:card lg:flex-row">
        <form class="lg:p-8 lg:mx-auto flex flex-col gap-4 w-1/2" @submit.prevent="submitExpense">
          <BaseInput label="Concepto" v-model="concept" />
          <BaseSelect label="Tipo de entrada" :items="expenseTypes" v-model="type" />
          <BaseInput
            label="Cantidad"
            type="number"
            v-model.number="price"
            @keypress="isNumber($event)"
          />
          <BaseInput label="Categoría" v-model="category" />

          <Divider />

          <section class="flex justify-end gap-4 lg:justify-between">
            <NuxtLink to="/admin/expenses">
              <BaseButton>Cancelar</BaseButton>
            </NuxtLink>
            <BaseButton type="primary" :loading="btnLoading">Guardar</BaseButton>
          </section>
        </form>
        <section class="flex flex-col gap-8 lg:p-8 w-1/2">
          <!-- <UploadWidget /> -->
          <!-- <UploadWidget class="w-1/3" /> -->
          <h3>Ticket</h3>
          <figure class="w-2/3">
            <img :src="ticketUrl" alt="" class="max-w-full" />
          </figure>
        </section>
      </section>
    </template>
  </MainSection>
</template>
