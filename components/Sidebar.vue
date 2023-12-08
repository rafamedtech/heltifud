<script setup lang="ts">
import { sidebarLinks } from '@/utils/sidebarLinks';
import logo from '@/assets/img/logo-horizontal.png';

const links: SidebarLink[] = sidebarLinks;

// const supabase = useSupabaseClient();

// async function userLogout() {
//   try {
//     const { error } = await supabase.auth.signOut();

//     if (error) throw error;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }
</script>

<template>
  <ul
    class="flex w-1/6 fixed flex-col min-h-screen border-r bg-base-300 justify-between gap-2 px-6"
  >
    <li class="lg:pt-4 flex flex-col gap-0">
      <img :src="logo" alt="" class="w-36 lg:w-40 mt-1" />

      <Divider sidebar />

      <ul class="flex flex-col gap-2 text-base-100">
        <li v-for="{ href, icon, title } in links" :key="title">
          <NuxtLink
            :to="href"
            class="flex items-center gap-2 py-2 transition-all"
            active-class=" px-4 text-primary bg-accent/20 rounded-lg font-bold transition-all"
          >
            <Icon size="24" :name="icon" />
            <span class="text-sm">{{ title }}</span>
          </NuxtLink>
        </li>

        <Divider sidebar />

        <li>
          <BaseButton class="max-w-fit" type="primary"
            ><Icon name="icon-park-outline:logout" /> Logout
          </BaseButton>
        </li>
      </ul>
    </li>
  </ul>
</template>
