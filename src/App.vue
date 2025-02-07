<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

// Initialize theme based on system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  theme.global.name.value = 'dark'
}
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
:root {
  --v-theme-primary: #5D87FF;
  --v-theme-secondary: #49BEFF;
  --v-theme-accent: #0d6efd;
}

.v-application {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .v-container {
    padding: 12px !important;
  }
}
</style>
