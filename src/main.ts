import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// ApexCharts
import VueApexCharts from 'vue3-apexcharts'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Styles
import '@/styles/main.scss'

// Fonts
import 'roboto-fontface/css/roboto/roboto-fontface.css'

// Configure Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          tertiary: '#E57373',
          accent: '#005CAF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          tertiary: '#E57373',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  defaults: {
    VBtn: {
      variant: 'elevated',
      style: 'text-transform: none;'
    },
    VCard: {
      elevation: 1
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VList: {
      density: 'comfortable'
    },
    VDataTable: {
      density: 'comfortable'
    }
  }
})

// Create and configure the app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)

// Error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Vue instance:', vm)
  console.error('Error info:', info)
}

// Performance tracking in development
if (import.meta.env.DEV) {
  app.config.performance = true
}

// Global properties
app.config.globalProperties.$filters = {
  // Add any global filters here
  capitalize(value: string): string {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  
  formatDate(value: string): string {
    if (!value) return ''
    return new Date(value).toLocaleDateString()
  },
  
  formatCurrency(value: number): string {
    if (!value) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
}

// Global directives
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
})

// Mount the app
app.mount('#app')

// Export for use in tests
export { app, router, vuetify }
