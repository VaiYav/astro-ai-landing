<template>
  <div class="app-container">
    <NavigationHeader />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
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
  padding: 0 1rem;
  box-sizing: border-box;
}
main {
  flex-grow: 1;
}
</style>
