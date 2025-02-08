import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      watch: {
        usePolling: true
      },
      fs: {
        strict: true
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    preview: {
      port: 5000,
      strictPort: true,
      host: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'vuetify-vendor': ['vuetify'],
            'ui-components': [
              './src/views/ui-elements/UiAlert.vue',
              './src/views/ui-elements/UiAvatar.vue',
              './src/views/ui-elements/UiBadge.vue',
              './src/views/ui-elements/UiButton.vue',
              './src/views/ui-elements/UiCard.vue',
              './src/views/ui-elements/UiChip.vue',
              './src/views/ui-elements/UiDialog.vue',
              './src/views/ui-elements/UiDivider.vue',
              './src/views/ui-elements/UiExpansionPanel.vue',
              './src/views/ui-elements/UiFooter.vue',
              './src/views/ui-elements/UiHover.vue',
              './src/views/ui-elements/UiIcon.vue',
              './src/views/ui-elements/UiImage.vue',
              './src/views/ui-elements/UiList.vue',
              './src/views/ui-elements/UiMenu.vue',
              './src/views/ui-elements/UiNavigationDrawer.vue',
              './src/views/ui-elements/UiOverlay.vue',
              './src/views/ui-elements/UiPagination.vue',
              './src/views/ui-elements/UiParallax.vue',
              './src/views/ui-elements/UiProgress.vue',
              './src/views/ui-elements/UiRating.vue',
              './src/views/ui-elements/UiSelect.vue',
              './src/views/ui-elements/UiSlider.vue',
              './src/views/ui-elements/UiSnackbar.vue',
              './src/views/ui-elements/UiSwitch.vue',
              './src/views/ui-elements/UiTable.vue',
              './src/views/ui-elements/UiTabs.vue',
              './src/views/ui-elements/UiTextField.vue',
              './src/views/ui-elements/UiTimeline.vue',
              './src/views/ui-elements/UiTooltip.vue',
              './src/views/ui-elements/UiTreeView.vue',
              './src/views/ui-elements/UiVirtualScroller.vue',
              './src/views/ui-elements/UiWindow.vue'
            ]
          }
        }
      },
      target: 'esnext',
      minify: 'esbuild'
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variables.scss";
            @import "@/styles/settings.scss";
          `
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'vuetify',
        '@mdi/font',
        'roboto-fontface',
        'vue3-apexcharts'
      ],
      exclude: []
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      pure: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.trace'] : []
    }
  }
})
