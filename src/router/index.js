import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { routes } from './routes';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});
const authGuard = async (to, from, next) => {
    const auth = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta?.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta?.requiresGuest);
    if (requiresAuth && !auth.isAuthenticated) {
        next({ name: 'login' });
    }
    else if (requiresGuest && auth.isAuthenticated) {
        next({ name: 'dashboard' });
    }
    else {
        next();
    }
};
router.beforeEach(authGuard);
export default router;
