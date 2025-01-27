import './assets/main.css'

import { createApp, type ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/theme'
import ErrorBoundary from './components/ErrorBoundary.vue'
import { useAuthStore } from './stores/auth'

import App from './App.vue'
import router from './router'

// Create Vue application instance
const app = createApp(App)
const pinia = createPinia()

// Use plugins
app.component('ErrorBoundary', ErrorBoundary)

// Register global plugins
app.use(pinia)
app.use(router)

// Initialize theme
useThemeStore(pinia).initTheme()

// Initialize auth store (needed for auth state)
useAuthStore(pinia)

app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
  console.error('Global error:', {
    error: err,
    component: instance?.$.type.name,
    info
  })

  // Track errors in production
  if (import.meta.env.PROD && err instanceof Error) {
    // Log error details
    console.error({
      name: err.name,
      message: err.message,
      stack: err.stack
    })
    // TODO: Add error tracking service integration
  }
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

// Mount the application
app.mount('#app')
