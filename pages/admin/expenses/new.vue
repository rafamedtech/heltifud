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
      <AppHeading title="Capturar nuevo gasto/ingreso" />
    </template>
    <template #content>
      <section class="lg:bg-white flex flex-col max-w-5xl lg:mx-auto lg:card lg:flex-row">
        <form class="lg:p-8 w-full lg:mx-auto flex flex-col" @submit.prevent="submitExpense">
          <section class="lg:flex w-full gap-4">
            <section class="flex flex-col gap-2 lg:w-1/2">
              <BaseInput label="Concepto" v-model="concept" />
              <BaseSelect label="Tipo de entrada" :items="expenseTypes" v-model="type" />
              <BaseInput
                label="Cantidad"
                type="number"
                v-model.number="price"
                @keypress="isNumber($event)"
              />
              <BaseInput label="Categoría" v-model="category" />
            </section>

            <Divider />

            <section class="flex flex-col gap-8 lg:p-4 lg:pt-0 lg:w-1/3">
              <UploadWidget class="lg:w-1/3" />
              <figure class="w-2/3">
                <img :src="ticketUrl" alt="" class="max-w-full" />
              </figure>
            </section>
          </section>

          <Divider />

          <section class="flex justify-end gap-4">
            <NuxtLink to="/admin/expenses" class="btn lg:w-52 normal-case text-lg">
              Cancelar
            </NuxtLink>
            <BaseButton type="submit" color="primary" :loading="btnLoading">Guardar</BaseButton>
          </section>

          <!-- <UploadWidget /> -->
        </form>
      </section>
    </template>
  </MainSection>
</template>
