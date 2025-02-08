import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/styles/settings.scss' }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "src/styles/variables" as *;
          @use "src/styles/settings" as *;
        `
      }
    }
  }
})