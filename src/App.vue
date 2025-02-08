<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Global Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Global Loading -->
    <v-overlay
      v-model="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

export default defineComponent({
  name: 'App',

  setup() {
    const theme = useTheme()
    const layoutStore = useLayoutStore()
    const { snackbar, loading } = storeToRefs(layoutStore)

    // Watch for system color scheme changes
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      theme.global.name.value = e.matches ? 'dark' : 'light'
    }

    // Initial check
    handleThemeChange(darkThemeMediaQuery)

    // Add listener for changes
    darkThemeMediaQuery.addEventListener('change', handleThemeChange)

    // Cleanup
    onUnmounted(() => {
      darkThemeMediaQuery.removeEventListener('change', handleThemeChange)
    })

    return {
      snackbar,
      loading
    }
  }
})
</script>

<style lang="scss">
// Global styles
html {
  overflow-y: auto;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Scrollbar styling
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}

// Dark theme scrollbar
.v-theme--dark {
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// Selection styling
::selection {
  background-color: var(--v-primary-base);
  color: white;
}

// Focus outline
:focus {
  outline-color: var(--v-primary-base);
}

// Utility classes
.cursor-pointer {
  cursor: pointer;
}

.user-select-none {
  user-select: none;
}

.text-decoration-none {
  text-decoration: none;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.overflow-hidden {
  overflow: hidden;
}

.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

// Print styles
@media print {
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  body {
    background: white !important;
    color: black !important;
  }

  a {
    text-decoration: none !important;
    color: black !important;
  }
}
</style>
