<script setup lang="ts">
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const store = useLayoutStore()

const layoutClass = computed(() => ({
  'layout-horizontal': store.layoutType === 'horizontal',
  'layout-vertical': store.layoutType === 'vertical',
  'layout-mini': store.sidebarType === 'mini',
  'theme-dark': store.isDark
}))
</script>

<template>
  <div class="app-layout" :class="layoutClass">
    <!-- Layout Controls -->
    <div class="layout-controls">
      <button @click="store.toggleLayout">
        {{ store.layoutType === 'horizontal' ? 'Switch to Vertical' : 'Switch to Horizontal' }}
      </button>
      <button @click="store.toggleSidebar" v-if="store.layoutType === 'vertical'">
        {{ store.sidebarType === 'mini' ? 'Expand Sidebar' : 'Collapse Sidebar' }}
      </button>
      <button @click="store.toggleTheme">
        {{ store.isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>

    <!-- Main Content -->
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &.theme-dark {
    background-color: #1a1a1a;
    color: #ffffff;
  }

  &.layout-horizontal {
    .layout-controls {
      flex-direction: row;
      justify-content: flex-end;
      padding: 1rem;
    }
  }

  &.layout-vertical {
    flex-direction: row;

    .layout-controls {
      flex-direction: column;
      padding: 1rem;
      border-right: 1px solid #ddd;
      
      .theme-dark & {
        border-color: #333;
      }
    }

    &.layout-mini .layout-controls {
      width: 64px;
    }
  }
}

.layout-controls {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .theme-dark & {
      border-color: #333;
      color: #fff;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

.layout-content {
  flex: 1;
  padding: 1rem;
}
</style>