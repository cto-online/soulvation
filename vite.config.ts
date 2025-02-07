import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true // Fail if port 3000 is not available
  },
  preview: {
    port: 5000,
    strictPort: true // Fail if port 5000 is not available for production preview
  }
})
