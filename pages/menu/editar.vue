<script setup lang="ts">
import { menu } from '@/utils/menu';

const currentMenu = ref(null);

const isLoading = ref(true);

const orderForm = reactive({
  name: 'Rafael Valenzuela',
  phone: '6642591920',
  address: 'San Patricio 6109, H14, Santa Fe I',
});

const desayuno = ref(false);
const comida = ref(false);
const cena = ref(false);

const desayunoQty = ref(3);
const comidaQty = ref(3);
const cenaQty = ref(3);

const planType = ref('basico');
const basicOption = ref('');

const userMenu = computed(() => {});

const orderReady = ref(false); // temporary variable

const orderTotal = computed(() => 1);

onMounted(() => {
  isLoading.value = false;
  currentMenu.value = menu as any;
});
</script>

<template>
  <MainSection :loading="isLoading">
    <template #heading>
      <AppHeading
        title="Ingresar una orden"
        description="Elige entre nuestros planes básicos o flexibles"
      />
    </template>
    <template #content>
      <form>
        <section class="flex flex-col gap-4">
          <h3 class="text-xl text-primary">Información de contacto</h3>
          <div class="form-control gap-2">
            <label for="" class="text-black">Tu nombre</label>
            <input
              type="text"
              class="input input-primary bg-white text-black"
              v-model="orderForm.name"
            />
          </div>
          <div class="form-control gap-2">
            <label for="" class="text-black">Teléfono</label>
            <input
              type="text"
              class="input input-primary bg-white text-black"
              v-model="orderForm.phone"
            />
          </div>
          <div class="form-control gap-2">
            <label for="" class="text-black">Domicilio de entrega</label>
            <input
              type="text"
              class="input input-primary bg-white text-black"
              v-model="orderForm.address"
            />
          </div>
        </section>

        <section class="flex flex-col gap-4 mt-4">
          <h3 class="text-xl text-primary">Tipo de plan</h3>
          <fieldset class="flex flex-col gap-4">
            <PlanCard :selected="planType === 'basico'" label-for="basico">
              <input
                id="basico"
                type="radio"
                name="radio-1"
                class="radio absolute right-4 top-4 radio-primary"
                value="basico"
                v-model="planType"
              />
              <h2 class="card-title text-primary">básico</h2>
              <p>
                Las opciones del menú son predeterminadas y no se pueden modificar (El menú cambia
                cada semana).
              </p>
            </PlanCard>

            <PlanCard :selected="planType === 'flexible'" label-for="flexible">
              <input
                id="flexible"
                type="radio"
                name="radio-1"
                class="radio absolute right-4 top-4 radio-primary"
                value="flexible"
                v-model="planType"
              />
              <h2 class="card-title text-primary">Flexible</h2>
              <p class="">
                Personaliza los platillos e incluso agrega o elimina opciones de tu menú semanal (El
                costo dependerá de las opciones elegidas).
              </p>
            </PlanCard>
          </fieldset>
        </section>
      </form>

      <section class="pb-24" v-show="planType === 'basico'">
        <h3 class="text-xl text-primary mt-4">Selecciona tu(s) plan(es):</h3>
        <section class="mt-4 gap-2 flex flex-col">
          <PlanCard label-for="basico-3d" :selected="desayuno">
            <input
              id="basico-3d"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="desayuno"
            />
            <h2 class="card-title text-primary">Desayuno</h2>
            <p class="">Opciones para desayunar rico y saludable.</p>
            <section v-show="desayuno" class="flex justify-center gap-6 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">3 días ($400)</span>
                  <input type="radio" name="radio-10" class="radio radio-primary" checked />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">5 días ($600)</span>
                  <input type="radio" name="radio-10" class="radio radio-primary" />
                </label>
              </div>
            </section>
          </PlanCard>

          <PlanCard label-for="basico-3c1" :selected="comida">
            <input
              id="basico-3c1"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="comida"
            />
            <h2 class="card-title text-primary">Comida</h2>
            <p class="">Opciones para la hora de comida.</p>
            <section v-show="comida" class="flex justify-center gap-6 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">3 días ($500)</span>
                  <input type="radio" name="radio-11" class="radio radio-primary" checked />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">5 días ($700)</span>
                  <input type="radio" name="radio-11" class="radio radio-primary" />
                </label>
              </div>
            </section>
          </PlanCard>

          <PlanCard label-for="basico-3c2" :selected="cena">
            <input
              id="basico-3c2"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="cena"
            />
            <h2 class="card-title text-primary">Cena</h2>
            <p class="">Opciones para cenar ligero y delicioso.</p>
            <section v-show="cena" class="flex justify-center gap-6 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">3 días ($450)</span>
                  <input type="radio" name="radio-12" class="radio radio-primary" checked />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">5 días ($650)</span>
                  <input type="radio" name="radio-12" class="radio radio-primary" />
                </label>
              </div>
            </section>
          </PlanCard>
        </section>
      </section>

      <section class="pb-24" v-show="planType === 'flexible'">
        <h3 class="text-xl text-primary mt-4">Personaliza tu plan:</h3>
        <section class="mt-4 gap-2 flex flex-col">
          <PlanCard label-for="basico-3d" :selected="desayuno">
            <input
              id="basico-3d"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="desayuno"
            />
            <h2 class="card-title text-primary">Desayuno</h2>
            <p class="">Opciones para desayunar rico y saludable.</p>
            <section v-show="desayuno" class="flex justify-center gap-6 mt-2">
              <div>
                <div class="form-control">
                  <label class="label cursor-pointer gap-2">
                    <span class="label-text">3 días</span>
                    <input
                      type="radio"
                      name="radio-10"
                      class="radio radio-primary"
                      value="3"
                      v-model="desayunoQty"
                    />
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer gap-2">
                    <span class="label-text">5 días</span>
                    <input
                      type="radio"
                      name="radio-10"
                      class="radio radio-primary"
                      value="5"
                      v-model="desayunoQty"
                    />
                  </label>
                </div>
                <div class="flex flex-col gap-2">
                  <div v-for="(day, index) in 5">
                    <p class="text-primary">Día {{ index + 1 }}</p>
                    <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">Selecciona el platillo</span>
                      </label>
                      <select class="select select-bordered select-primary">
                        <option>Opcion 1</option>
                        <option>Opcion 2</option>
                      </select>
                    </div>
                    <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">Selecciona la guarnicion</span>
                      </label>
                      <select class="select select-bordered select-primary">
                        <option>Opcion 1</option>
                        <option>Opcion 2</option>
                      </select>
                    </div>
                    <div class="divider mt-8"></div>
                  </div>
                </div>
              </div>
            </section>
          </PlanCard>

          <PlanCard label-for="basico-3c1" :selected="comida">
            <input
              id="basico-3c1"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="comida"
            />
            <h2 class="card-title text-primary">Comida</h2>
            <p class="">Opciones para la hora de comida.</p>

            <section v-show="comida" class="mt-2">
              <div class="flex justify-center gap-6">
                <div class="form-control">
                  <label class="label cursor-pointer gap-2">
                    <span class="label-text">3 días</span>
                    <input
                      type="radio"
                      name="radio-11"
                      class="radio radio-primary"
                      value="3"
                      v-model="comidaQty"
                    />
                  </label>
                </div>

                <div class="form-control">
                  <label class="label cursor-pointer gap-2">
                    <span class="label-text">5 días</span>
                    <input
                      type="radio"
                      name="radio-11"
                      class="radio radio-primary"
                      value="5"
                      v-model="comidaQty"
                    />
                  </label>
                </div>
              </div>
            </section>
          </PlanCard>

          <PlanCard label-for="basico-3c2" :selected="cena">
            <input
              id="basico-3c2"
              type="checkbox"
              class="checkbox checkbox-primary absolute right-4 top-4"
              v-model="cena"
            />
            <h2 class="card-title text-primary">Cena</h2>
            <p class="">Opciones para cenar ligero y delicioso.</p>
            <section v-show="cena" class="flex justify-center gap-6 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">3 días</span>
                  <input
                    type="radio"
                    name="radio-12"
                    class="radio radio-primary"
                    value="3"
                    v-model="cenaQty"
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text">5 días</span>
                  <input
                    type="radio"
                    name="radio-12"
                    class="radio radio-primary"
                    value="5"
                    v-model="cenaQty"
                  />
                </label>
              </div>
            </section>
          </PlanCard>
        </section>
      </section>

      <div class="btm-nav pr-4">
        <button class="text-xl flex flex-row">
          <!-- <span>Calorías:</span>
          <span class="text-primary">9800</span> -->
        </button>

        <button class="text-xl flex flex-row">
          <span>Total:</span>
          <span class="text-primary">${{ orderTotal }}</span>
        </button>

        <button class="btn btn-primary flex-1" :disabled="orderTotal === 0">Ordenar</button>
      </div>
    </template>
  </MainSection>
</template>
