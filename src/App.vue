<script setup lang="ts">
import BaseLayout from './layouts/BaseLayout.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <BaseLayout>
    <div class="content">
      <div class="logos">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue with Matdash Layouts" />
    </div>
  </BaseLayout>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

.content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logos {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.theme-dark .logo {
  filter: invert(1);
}

.theme-dark .logo:hover {
  filter: invert(1) drop-shadow(0 0 2em #646cffaa);
}

.theme-dark .logo.vue:hover {
  filter: invert(1) drop-shadow(0 0 2em #42b883aa);
}
</style>
