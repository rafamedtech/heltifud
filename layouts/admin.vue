<template>
  <main class="flex w-full justify-center lg:pt-0">
    <div
      class="hidden justify-between lg:flex lg:w-1/6 border-r-2 dark:border-base-100/10 min-h-screen"
    >
      <Sidebar />
    </div>

    <div class="lg:w-5/6 w-full transition-all">
      <MobileTopbar />
      <div class="bg-[#f3f3f3] lg:relative px-4 lg:px-0 lg:pb-0 pb-24 min-h-screen">
        <!-- <DarkLightBtn /> -->

        <slot> </slot>
      </div>
      <MobileNavbar />
    </div>
  </main>
</template>
