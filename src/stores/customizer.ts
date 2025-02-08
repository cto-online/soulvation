import { defineStore } from "pinia";
import { reactive, computed } from 'vue';
import config, { type CustomizerConfig } from '@/config';

interface State extends CustomizerConfig {}

export const useCustomizerStore = defineStore(
  'customizer', 
  () => {
    // State
    const state = reactive<State>({
      Sidebar_drawer: config.Sidebar_drawer,
      Customizer_drawer: config.Customizer_drawer,
      mini_sidebar: config.mini_sidebar,
      setHorizontalLayout: config.setHorizontalLayout,
      setRTLLayout: config.setRTLLayout,
      actTheme: config.actTheme,
      boxed: config.boxed,
      setBorderCard: config.setBorderCard
    });

    // Getters
    const isSidebarOpen = computed(() => state.Sidebar_drawer);
    const isMiniSidebar = computed(() => state.mini_sidebar);
    const isHorizontalLayout = computed(() => state.setHorizontalLayout);
    const isRTL = computed(() => state.setRTLLayout);
    const currentTheme = computed(() => state.actTheme);
    const isBoxed = computed(() => state.boxed);
    const hasBorderCard = computed(() => state.setBorderCard);

    // Actions
    function SET_SIDEBAR_DRAWER() {
      state.Sidebar_drawer = !state.Sidebar_drawer;
    }

    function SET_MINI_SIDEBAR(value: boolean) {
      state.mini_sidebar = value;
    }

    function SET_CUSTOMIZER_DRAWER(value: boolean) {
      state.Customizer_drawer = value;
    }

    function SET_LAYOUT(value: boolean) {
      state.setHorizontalLayout = value;
    }

    function SET_THEME(value: string) {
      state.actTheme = value;
    }

    function SET_CARD_BORDER(value: boolean) {
      state.setBorderCard = value;
    }

    function SET_RTL(value: boolean) {
      state.setRTLLayout = value;
    }

    function SET_BOXED(value: boolean) {
      state.boxed = value;
    }

    function resetSettings() {
      Object.assign(state, {
        Sidebar_drawer: config.Sidebar_drawer,
        Customizer_drawer: config.Customizer_drawer,
        mini_sidebar: config.mini_sidebar,
        setHorizontalLayout: config.setHorizontalLayout,
        setRTLLayout: config.setRTLLayout,
        actTheme: config.actTheme,
        boxed: config.boxed,
        setBorderCard: config.setBorderCard
      });
    }

    return {
      // State
      ...state,

      // Getters
      isSidebarOpen,
      isMiniSidebar,
      isHorizontalLayout,
      isRTL,
      currentTheme,
      isBoxed,
      hasBorderCard,

      // Actions
      SET_SIDEBAR_DRAWER,
      SET_MINI_SIDEBAR,
      SET_CUSTOMIZER_DRAWER,
      SET_LAYOUT,
      SET_THEME,
      SET_CARD_BORDER,
      SET_RTL,
      SET_BOXED,
      resetSettings
    };
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
);
