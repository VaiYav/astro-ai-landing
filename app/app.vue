<script setup>
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gtmPush } = useNuxtApp()
const { locale } = useI18n()

useServerHead({
  htmlAttrs: { lang: locale.value },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
    },
  ],
  link: [
    // Favicon
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },

    // Preconnect для внешних ресурсов
    { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
  ],
})

useSeoMeta({})

onMounted(() => {
  if (typeof $gtmPush !== 'undefined') {
    $gtmPush({
      event: 'page_view',
      page_path: window.location.pathname,
      page_title: document.title,
    })
  }
})
</script>

<template>
  <div>
    <!-- GTM noscript -->
    <noscript>
      <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-NSN2VZPZ"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
      title="Google Tag Manager"
      />
    </noscript>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
