<script setup>
const isDark = useDark();
const toggleDark = useToggle(isDark);

const darkModeIcon = computed(() =>
  isDark.value
    ? 'material-symbols:lightbulb-circle-outline-rounded'
    : 'material-symbols:nightlight-badge-rounded'
);
</script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end absolute top-6 right-8">
    <label tabindex="0" class="btm-nav-label text-xs"
      ><Icon
        name="icon-park-outline:mindmap-list"
        class="text-2xl text-base-content dark:text-base-100"
    /></label>

    <ul
      tabindex="0"
      class="dropdown-content z-[100] text-dark-strong menu p-2 mt-4 dark:text-base-100 bg-base-100 dark:bg-dark-strong rounded-box shadow w-48"
    >
      <li @click="toggleDark()">
        <a>
          <button class="flex w-full cursor-pointer items-center gap-2 py-2">
            <Icon :name="darkModeIcon" class="text-xl" />
            <p class="text-sm">{{ isDark ? 'Light' : 'Dark' }} Mode</p>
          </button>
        </a>
      </li>
      <li class="z-[100]">
        <a>
          <NuxtLink to="/" class="flex items-center gap-2 py-2 cursor-pointer">
            <Icon class="text-xl" name="icon-park-outline:attention" />
            <span class="text-sm">Más información</span>
          </NuxtLink>
        </a>
      </li>
    </ul>
  </div>
</template>
