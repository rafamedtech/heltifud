<script setup>
import logo from '@/assets/img/logo-horizontal.png';
</script>

<template>
  <main>
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col bg-base-300">
        <!-- Navbar -->
        <div class="bg-primary text-xs text-white text-center py-3">
          <p class="tracking-widest">Servicio disponible únicamente para Tijuana, B.C.</p>
        </div>
        <div class="navbar lg:container bg-base-300 py-4 lg:py-6">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <NavbarIcon />
            </label>
          </div>
          <div class="flex-1 px-2 mx-2 gap-4">
            <img :src="logo" alt="" class="w-36 lg:w-40" />
            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal">
                <NavLinks />
              </ul>
            </div>
          </div>
        </div>

        <!-- Page content here -->
        <slot></slot>
      </div>
      <div class="drawer-side z-[99999]">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200">
          <!-- Sidebar content here -->
          <NavLinks />
        </ul>
      </div>
    </div>
  </main>
</template>
