<script setup lang="ts">
import { computed, watch } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useTheme } from 'vuetify'

const store = useLayoutStore()
const theme = useTheme()

// Sync layout store theme with Vuetify theme
watch(() => store.isDark, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light'
})

const layoutClass = computed(() => ({
  'layout-horizontal': store.layoutType === 'horizontal',
  'layout-vertical': store.layoutType === 'vertical',
  'layout-mini': store.sidebarType === 'mini'
}))
</script>

<template>
  <v-app :theme="store.isDark ? 'dark' : 'light'">
    <!-- Navigation Drawer for Vertical Layout -->
    <v-navigation-drawer
      v-if="store.layoutType === 'vertical'"
      v-model="store.sidebarType"
      :rail="store.sidebarType === 'mini'"
      :permanent="true"
      :width="240"
      :rail-width="64"
    >
      <v-list>
        <v-list-item>
          <v-btn
            block
            @click="store.toggleSidebar"
            :icon="store.sidebarType === 'mini' ? 'mdi-menu-open' : 'mdi-menu'"
            variant="text"
          />
        </v-list-item>
        
        <v-list-item>
          <v-btn
            block
            @click="store.toggleLayout"
            :prepend-icon="store.layoutType === 'horizontal' ? 'mdi-view-sequential' : 'mdi-view-parallel'"
            variant="text"
          >
            {{ store.sidebarType === 'mini' ? '' : (store.layoutType === 'horizontal' ? 'Vertical' : 'Horizontal') }}
          </v-btn>
        </v-list-item>
        
        <v-list-item>
          <v-btn
            block
            @click="store.toggleTheme"
            :prepend-icon="store.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            variant="text"
          >
            {{ store.sidebarType === 'mini' ? '' : (store.isDark ? 'Light' : 'Dark') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar for Horizontal Layout -->
    <v-app-bar
      v-if="store.layoutType === 'horizontal'"
      :elevation="1"
    >
      <v-container class="d-flex align-center">
        <v-btn
          @click="store.toggleLayout"
          :icon="store.layoutType === 'horizontal' ? 'mdi-view-sequential' : 'mdi-view-parallel'"
          variant="text"
        />
        
        <v-btn
          @click="store.toggleTheme"
          :icon="store.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
        />
        
        <v-spacer />
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="fill-height">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.v-navigation-drawer {
  .v-btn {
    justify-content: start;
    padding-left: 16px;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .v-navigation-drawer {
    width: 100% !important;
  }
  
  .v-app-bar {
    .v-container {
      padding: 0 8px;
    }
  }
}
</style>