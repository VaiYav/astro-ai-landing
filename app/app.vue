<script setup>
import { onMounted } from 'vue'

useServerHead({
  htmlAttrs: { lang: 'uk' },
})
useSeoMeta({
})

onMounted(() => {
  console.log('gtag', gtag)
  console.log('window.gtag', window?.gtag)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_opened', {
      event_category: 'engagement',
    })
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
