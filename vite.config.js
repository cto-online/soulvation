import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: parseInt(process.env.VITE_PORT || '4000'),
        strictPort: true,
        hmr: {
            protocol: 'ws',
            host: '0.0.0.0',
            port: parseInt(process.env.VITE_HMR_PORT || '4001'),
            clientPort: parseInt(process.env.VITE_HMR_PORT || '4001')
        },
        watch: {
            usePolling: true
        }
    }
});
