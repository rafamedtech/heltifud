<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';
const isLoading = ref(true);

const state = reactive({
  email: '',
  password: '',
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Campo obligatorio' });
  if (!state.password) errors.push({ path: 'password', message: 'Campo obligatorio' });
  return errors;
};

const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const errorMsg = ref('');
const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    state.email = '';
    state.password = '';

    if (error) throw error;
  } catch (error: any) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = '';
    }, 3000);
  }
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  await userLogin();
}

watchEffect(() => {
  if (user.value) {
    return navigateTo('/menu/editar');
  }
});

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Iniciar sesión" />
    </template>

    <template #content>
      <UContainer :ui="{ constrained: 'max-w-md' }">
        <UCard>
          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit"> Login </UButton>
          </UForm>
        </UCard>
      </UContainer>
    </template>
  </MainSection>
</template>
