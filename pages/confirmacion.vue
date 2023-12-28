<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => (isLoading.value = false));
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="¡Pedido registrado!" />
    </template>

    <template #content>
      <section class="px-2">
        <section class="pb-8">
          <p class="text-lg mb-4">
            Tu pedido se encuentra en estado "Pendiente" y pasará a "Confirmado" una vez se reciba
            el pago correspondiente.
          </p>
          <p class="text-lg">
            Puedes realizar el pago en efectivo o por transferencia bancaria. Una vez realizado el
            pago, envía una foto del comprobante a nuestro WhatsApp.
          </p>
          <section class="flex justify-center">
            <UButton
              label="WhatsApp"
              class="mt-4"
              to="https://wa.me/5216648161284?text=Hola%2C%20quiero%20confirmar%20un%20pedido%20de%20Heltifud"
              target="_blank"
            >
              <Icon name="ph:whatsapp-logo-duotone" size="32" />
              <p class="text-lg">Enviar comprobante</p>
            </UButton>
          </section>
        </section>

        <UCard>
          <template #header>
            <h3 class="text-lg text-primary font-semibold">Información de pago</h3>
          </template>

          <p class="text-xl font-bold">Banco: BBVA</p>
          <p class="text-xl font-bold">CLABE: 072 111 000 000 000 000</p>
          <p class="text-xl font-bold">A nombre de: Rafael A. Valenzuela</p>
          <!-- <p class="text-xl font-bold">RFC: HEF200101111</p> -->
          <p class="text-xl font-bold">Concepto: Tu nombre completo</p>
        </UCard>
      </section>
    </template>
  </MainSection>
</template>
