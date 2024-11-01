<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtLoadingIndicator color="#ffcc00" :height="5" />
    <NuxtPage />
  </NuxtLayout>
  </div>
</template>
<script setup>
import { useHead } from 'nuxt/app'

useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ],
  bodyAttrs: {
    class: "bg-colorBgLight dark:bg-colorBgDark",
  },
});

</script>