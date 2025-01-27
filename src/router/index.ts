import { 
  createRouter, 
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'
import type { RouteMeta } from './types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta?.requiresGuest)

  if (requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else if (requiresGuest && auth.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}

router.beforeEach(authGuard)

export default router
