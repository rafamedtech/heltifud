<script setup lang="ts">
const items = ref<any[]>([
  {
    id: 1,
    name: 'Pescado a la plancha',
  },
  {
    id: 2,
    name: 'Salpicon',
  },
  {
    id: 3,
    name: 'Ensalada de pollo (fria)',
  },
  {
    id: 4,
    name: 'Pechuga a la plancha',
  },
]);

const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Editar menu" description="Personaliza tu semana" />
    </template>
    <template #content>
      <form class="px-4">
        <div class="form-control">
          <label for="" class="text-black">Numero de orden</label>
          <input type="text" class="input input-primary bg-white text-black" />
        </div>
        <!-- <select
      v-bind="$attrs"
      @input="$emit('update:modelValue', handleInputChange($event))"
      id=""
      class="select  w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
    > -->
        <section class="mt-8">
          <!-- <h3 class="text-black">Dia 1</h3> -->

          <!-- <div class="form-control gap-2 mt-4">
            <label for="" class="dark:text-base-100">Platillo principal</label>
            <select
              id=""
              class="select  w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
            >
              <option v-for="item in items" :value="item" :key="item">{{ item }}</option>
            </select>
          </div> -->
        </section>
        <div class="tabs tabs-boxed bg-[#F3F3F3]">
          <input
            type="radio"
            name="my_tabs_2"
            class="tab active:bg-primary"
            aria-label="Dia 1"
            checked
          />
          <div class="tab-content py-10">
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Platillo</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option v-for="item in items" :value="item" :key="item">{{ item.name }}</option>
              </select>
            </div>
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Guarnicion</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option
                  v-for="(item, index) in items"
                  :value="item"
                  :key="item"
                  :selected="index === 1"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <input type="radio" name="my_tabs_2" class="tab" aria-label="Dia 2" />
          <div class="tab-content py-10">
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Platillo</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option v-for="item in items" :value="item" :key="item">{{ item.name }}</option>
              </select>
            </div>
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Guarnicion</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option v-for="item in items" :value="item" :key="item">{{ item.name }}</option>
              </select>
            </div>
          </div>

          <input type="radio" name="my_tabs_2" class="tab" aria-label="Dia 3" />
          <div class="tab-content py-10">
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Platillo</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option v-for="item in items" :value="item" :key="item">{{ item.name }}</option>
              </select>
            </div>
            <div class="form-control gap-2 mt-4">
              <label for="" class="dark:text-base-100">Guarnicion</label>
              <select
                id=""
                class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
              >
                <option v-for="item in items" :value="item" :key="item">{{ item.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </template>
  </MainSection>
</template>
