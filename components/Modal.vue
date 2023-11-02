<script setup>
// import { insumos } from '@/utils/insumos';

// function addInsumo() {
//   insumos.value.push({
//     id: Math.random(),
//     name: '',
//     qty: 0,
//     unit: 'gr',
//   });
// }
</script>

<template>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">Editar receta</h3>
      <form>
        <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="insumo in insumos" :key="insumo.id">
                <td>
                  <div class="form-control w-full max-w-xs">
                    <select class="select select-bordered" v-model="insumo.name">
                      <option disabled selected>Elige un insumo</option>

                      <option
                        v-for="insumoItem in insumos"
                        :key="insumoItem.id"
                        :value="insumoItem.name"
                      >
                        {{ insumoItem.name }}
                      </option>
                    </select>
                  </div>
                </td>
                <td>
                  <div class="join">
                    <input
                      class="input input-bordered join-item w-24"
                      type="number"
                      v-model="insumo.qty"
                    />
                    <span class="btn cursor-default join-item rounded-r-xl">{{ insumo.unit }}</span>
                  </div>
                </td>
                <td><Icon name="icon-park-outline:delete" /></td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-center w-full mt-8">
            <button class="btn btn-sm btn-primary normal-case" type="button" @click="addInsumo">
              Agregar insumo
            </button>
          </div>
        </div>
      </form>
    </div>
  </dialog>
</template>
