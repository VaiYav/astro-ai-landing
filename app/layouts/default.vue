<template>
  <div class="app-container">
    <NavigationHeader />
    <main>
      <slot />
    </main>
    <Footer />
    <SpeedInsights/>
  </div>
</template>

<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'
import NavigationHeader from "~/components/landing/NavigationHeader.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 0;
  box-sizing: border-box;
}
main {
  flex-grow: 1;
}
</style>
