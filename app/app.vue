<script setup>
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gtmPush } = useNuxtApp()

useServerHead({
  htmlAttrs: { lang: 'uk' },
})
useSeoMeta({
})
onMounted(() => {
  if ($gtmPush !== 'undefined') {
    $gtmPush({
      event: 'page_view',
      page_path: window.location.pathname,
      page_title: document.title,
    })
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
