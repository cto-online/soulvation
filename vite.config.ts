import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd(), '') // Load env files
  
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      }),
      VueDevTools()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command === 'build',
          drop_debugger: command === 'build'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'firebase-vendor': ['firebase/app', 'firebase/auth'],
            'ui-vendor': ['@headlessui/vue', '@heroicons/vue'],
            'utils': ['@vueuse/core', '@vueuse/firebase']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: command === 'serve'
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        '@vueuse/firebase',
        'firebase/app',
        'firebase/auth'
      ]
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
      cors: true
    },
    preview: {
      port: 3000
    }
  }
})
