<template>
  <header>
    <div class="header-content">
      <NuxtLink
        to="/"
        class="logo-link"
      >
        <h1>AI-Оракул</h1>
      </NuxtLink>
      <LangSwitcher />
    </div>
  </header>
</template>

<script setup>
import LangSwitcher from '~/components/common/LangSwitcher.vue'
</script>

<style scoped>
header {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(240, 195, 115, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  text-decoration: none;
}

h1 {
  font-size: 1.8rem;
  margin: 0;
}
</style>
