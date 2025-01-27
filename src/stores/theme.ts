import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const updateDOMTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const saveThemePreference = (theme: Theme) => {
  try {
    localStorage.setItem('theme', theme)
  } catch (error) {
    console.warn('Failed to save theme preference:', error)
  }
}

const getStoredTheme = (): Theme | null => {
  try {
    const theme = localStorage.getItem('theme')
    return theme === 'dark' || theme === 'light' ? theme : null
  } catch (error) {
    console.warn('Failed to read theme preference:', error)
    return null
  }
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // System theme preference media query
  const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const getSystemTheme = (): Theme => 
    systemDarkQuery.matches ? 'dark' : 'light'

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    updateDOMTheme(dark)
    saveThemePreference(dark ? 'dark' : 'light')
  }

  const toggleTheme = () => setTheme(!isDark.value)

  const initTheme = () => {
    const savedTheme = getStoredTheme()
    const systemTheme = getSystemTheme()
    
    setTheme(savedTheme === 'dark' || (!savedTheme && systemTheme === 'dark'))
  }

  // Watch for system theme changes
  systemDarkQuery.addEventListener('change', (e) => {
    const savedTheme = getStoredTheme()
    if (!savedTheme) {
      setTheme(e.matches)
    }
  })

  return {
    isDark,
    toggleTheme,
    initTheme
  }
})