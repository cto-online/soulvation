import { defineStore } from 'pinia'

interface LayoutState {
  sidebarType: 'default' | 'mini'
  layoutType: 'vertical' | 'horizontal'
  isDark: boolean
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    sidebarType: 'default',
    layoutType: 'vertical',
    isDark: false
  }),

  getters: {
    isMiniSidebar: (state) => state.sidebarType === 'mini',
    isHorizontalLayout: (state) => state.layoutType === 'horizontal',
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },

  actions: {
    toggleSidebar() {
      this.sidebarType = this.sidebarType === 'default' ? 'mini' : 'default'
    },
    toggleLayout() {
      this.layoutType = this.layoutType === 'vertical' ? 'horizontal' : 'vertical'
    },
    toggleTheme() {
      this.isDark = !this.isDark
    },
    setLayout(type: 'vertical' | 'horizontal') {
      this.layoutType = type
    },
    setSidebarType(type: 'default' | 'mini') {
      this.sidebarType = type
    },
    setTheme(isDark: boolean) {
      this.isDark = isDark
    }
  }
})