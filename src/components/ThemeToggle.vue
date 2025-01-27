<template>
  <button
    @click="themeStore.toggleTheme()"
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
    :aria-label="ariaLabel"
  >
    <Transition
      name="theme-toggle"
      mode="out-in"
    >
      <SunIcon
        v-if="themeStore.isDark"
        class="text-gray-400 dark:text-gray-300"
      />
      <MoonIcon
        v-else
        class="text-gray-400 dark:text-gray-300"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'

const themeStore = useThemeStore()
const ariaLabel = computed(() => 
  `Switch to ${themeStore.isDark ? 'light' : 'dark'} mode`
)
</script>

<style scoped>
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.theme-toggle-enter-from,
.theme-toggle-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.8);
}

.theme-toggle-enter-to,
.theme-toggle-leave-from {
  opacity: 1;
  transform: rotate(0) scale(1);
}
</style>