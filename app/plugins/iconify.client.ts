// plugins/iconify.client.ts
import { defineNuxtPlugin } from '#app'
import { Icon } from '@iconify/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon)
})
