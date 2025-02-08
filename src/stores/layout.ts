import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

interface SnackbarState {
  show: boolean
  text: string
  color: string
  timeout: number
}

type Theme = 'light' | 'dark'

export const useLayoutStore = defineStore('layout', () => {
  // State
  const snackbar = ref<SnackbarState>({
    show: false,
    text: '',
    color: 'success',
    timeout: 3000
  })
  const loading = ref(false)
  const drawer = ref(true)
  const mini = ref(false)
  const theme = ref<Theme>('light')
  const customizer = ref({
    mini: false,
    show: false
  })

  // Getters
  const isDrawerOpen = computed(() => drawer.value)
  const isMini = computed(() => mini.value)
  const isDark = computed(() => theme.value === 'dark')
  const isCustomizerOpen = computed(() => customizer.value.show)

  // Actions
  function showMessage(message: string, options: Partial<SnackbarState> = {}) {
    snackbar.value = {
      show: true,
      text: message,
      color: options.color || 'success',
      timeout: options.timeout || 3000
    }
  }

  function showSuccess(message: string, timeout?: number) {
    showMessage(message, { color: 'success', timeout })
  }

  function showError(message: string, timeout?: number) {
    showMessage(message, { color: 'error', timeout })
  }

  function showWarning(message: string, timeout?: number) {
    showMessage(message, { color: 'warning', timeout })
  }

  function showInfo(message: string, timeout?: number) {
    showMessage(message, { color: 'info', timeout })
  }

  function startLoading() {
    loading.value = true
  }

  function stopLoading() {
    loading.value = false
  }

  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function setDrawer(value: boolean) {
    drawer.value = value
  }

  function toggleMini() {
    mini.value = !mini.value
  }

  function setMini(value: boolean) {
    mini.value = value
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // Update HTML element for CSS variables
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function toggleCustomizer() {
    customizer.value.show = !customizer.value.show
  }

  function setCustomizer(value: boolean) {
    customizer.value.show = value
  }

  function toggleCustomizerMini() {
    customizer.value.mini = !customizer.value.mini
  }

  function setCustomizerMini(value: boolean) {
    customizer.value.mini = value
  }

  function resetLayout() {
    snackbar.value = {
      show: false,
      text: '',
      color: 'success',
      timeout: 3000
    }
    loading.value = false
    drawer.value = true
    mini.value = false
    theme.value = 'light'
    customizer.value = {
      mini: false,
      show: false
    }
  }

  // Initialize theme
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }

  // Watch for theme changes to persist
  watch(theme, (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  })

  return {
    // State
    snackbar,
    loading,
    drawer,
    mini,
    theme,
    customizer,

    // Getters
    isDrawerOpen,
    isMini,
    isDark,
    isCustomizerOpen,

    // Actions
    showMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    startLoading,
    stopLoading,
    toggleDrawer,
    setDrawer,
    toggleMini,
    setMini,
    toggleTheme,
    setTheme,
    toggleCustomizer,
    setCustomizer,
    toggleCustomizerMini,
    setCustomizerMini,
    resetLayout
  }
})