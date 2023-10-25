<script setup>
import logo from '@/assets/img/logo-horizontal.png';
</script>

<template>
  <main>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <div class="navbar lg:hidden bg-base-100 gap-4">
          <div class="flex-none">
            <label for="my-drawer-2" class="drawer-button lg:hidden">
              <Icon name="icon-park-outline:menu-unfold" size="28" />
            </label>
          </div>
          <div class="flex-1">
            <img :src="logo" alt="" class="w-32 lg:hidden" />
          </div>
          <!-- <div class="flex-none">
            <button class="btn btn-square btn-ghost">
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div> -->
        </div>

        <!-- Page content -->
        <slot></slot>
      </div>
      <Sidebar />
    </div>
  </main>
</template>
