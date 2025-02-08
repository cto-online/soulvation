/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // Add any custom Pinia properties here
    actTheme?: string
  }
}

declare module 'vuetify/lib' {
  export interface ThemeDefinition {
    // Add any custom Vuetify theme properties here
    dark: boolean
    colors: {
      [key: string]: string
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vuetify: any
    $pinia: any
  }
}