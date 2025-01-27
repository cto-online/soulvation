<template>
  <ErrorBoundary @error="handleError">
    <AppLayout>
      <router-view />
    </AppLayout>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'

const router = useRouter()

const handleError = (error: Error) => {
  // Log error and redirect to home on critical errors
  console.error('Application error:', error)
  if (error.message.includes('critical')) {
    router.push('/')
  }
}
</script>

<style>
</style>
