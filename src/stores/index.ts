import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useAuthStore } from '@/stores/auth';
import { useLayoutStore } from '@/stores/layout';
import { useDashboardStore } from '@/stores/dashboard';

// Create pinia instance
const pinia = createPinia();

// Add persistence plugin
pinia.use(piniaPluginPersistedstate);

// Export store instance
export default pinia;

// Export store modules
export {
    useAuthStore,
    useLayoutStore,
    useDashboardStore
};

// Export store types
export type { User } from '@/stores/auth';