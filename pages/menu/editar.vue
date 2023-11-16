<script setup lang="ts">
import { menu } from '@/utils/menu';

const currentMenu = ref(null);

const isLoading = ref(true);

const desayuno = ref(false);
const comida = ref(false);
const cena = ref(false);

const userMenu = computed(() => {});

onMounted(() => {
  isLoading.value = false;
  currentMenu.value = menu as any;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading title="Personaliza tu menú" :description="menu.dates" />
    </template>
    <template #content>
      <form class="pb-24">
        <section class="flex flex-col gap-4">
          <div class="form-control gap-2">
            <label for="" class="text-black">Tu nombre</label>
            <input type="text" class="input input-primary bg-white text-black" />
          </div>
          <div class="form-control gap-2">
            <label for="" class="text-black">Teléfono</label>
            <input type="text" class="input input-primary bg-white text-black" />
          </div>
          <div class="form-control gap-2">
            <label for="" class="text-black">Domicilio de entrega</label>
            <input type="text" class="input input-primary bg-white text-black" />
          </div>
        </section>

        <section class="flex p-2 gap-4 justify-center mt-4">
          <div class="form-control gap-2 items-center">
            <div class="badge badge-lg p-4 rounded-lg min-w-[6rem]">Desayuno</div>
            <input type="checkbox" v-model="desayuno" class="checkbox checkbox-primary" />
            <div class="form-control w-full max-w-xs" v-if="desayuno">
              <label class="label">
                <span class="label-text text-base-300">Cantidad</span>
              </label>
              <select class="select select-bordered">
                <option>3</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div class="form-control gap-2 items-center">
            <div class="badge badge-lg p-4 rounded-lg min-w-[6rem]">Comida</div>
            <input type="checkbox" v-model="comida" class="checkbox checkbox-primary" />
            <div class="form-control w-full max-w-xs" v-if="comida">
              <label class="label">
                <span class="label-text text-base-300">Cantidad</span>
              </label>
              <select class="select select-bordered">
                <option>3</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div class="form-control gap-2 items-center">
            <div class="badge badge-lg p-4 rounded-lg min-w-[6rem]">Cena</div>
            <input type="checkbox" v-model="cena" class="checkbox checkbox-primary" />
            <div class="form-control w-full max-w-xs" v-if="cena">
              <label class="label">
                <span class="label-text text-base-300">Cantidad</span>
              </label>
              <select class="select select-bordered">
                <option>3</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4 my-8" v-if="desayuno">
          <div class="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-primary text-3xl font-medium">Desayunos</div>
            <div class="collapse-content lg:flex">
              <section>
                <h4 class="text-base-200 text-xl font-bold">Dia 1</h4>
                <div class="form-control gap-2 my-4">
                  <select
                    id=""
                    class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
                  >
                    <option>Prueba</option>
                  </select>
                </div>
                <div class="divider divider-primary"></div>
              </section>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4 my-8" v-if="comida">
          <div class="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-primary text-3xl font-medium">Comidas</div>
            <div class="collapse-content lg:flex">
              <section>
                <h4 class="text-base-200 text-xl font-bold">Dia 1</h4>
                <div class="form-control gap-2 my-4">
                  <select
                    id=""
                    class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
                  >
                    <option>Prueba</option>
                  </select>
                </div>
                <div class="divider divider-primary"></div>
              </section>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4 my-8" v-if="cena">
          <div class="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-primary text-3xl font-medium">Cenas</div>
            <div class="collapse-content lg:flex">
              <section>
                <h4 class="text-base-200 text-xl font-bold">Dia 1</h4>
                <div class="form-control gap-2 my-4">
                  <select
                    id=""
                    class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
                  >
                    <option>Prueba</option>
                  </select>
                </div>
                <div class="divider divider-primary"></div>
              </section>
            </div>
          </div>
        </section>

        <!-- <section class="flex flex-col gap-4 my-8">
          <div class="collapse collapse-arrow bg-white" v-for="(day, index) in menu.days">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-primary text-3xl font-medium">
              {{ day.name }}
            </div>
            <div class="collapse-content lg:flex">
              <section v-for="course in day.courses">
                <h4 class="text-base-200 text-xl font-bold">{{ course.name }}</h4>
                <div class="form-control gap-2 my-4" v-for="(meal, index) in course.meals">
                  <select
                    id=""
                    class="select w-full lg:max-w-xs bg-white border-2 border-base-200 transition-all focus:ring focus:ring-primary dark:bg-dark-strong dark:border-base-100/10 dark:text-base-100"
                  >
                    <option v-for="ml in course.meals" :value="course.meals[index]" :key="meal.id">
                      {{ meal.name }}
                    </option>
                  </select>
                </div>
                <div class="divider divider-primary"></div>
              </section>
            </div>
          </div>
        </section> -->
      </form>
      <div class="btm-nav">
        <button></button>
        <button></button>
        <button class="text-xl flex flex-row">
          <span>Total:</span>
          <span class="text-primary">$1200</span>
        </button>
      </div>
    </template>
  </MainSection>
</template>
