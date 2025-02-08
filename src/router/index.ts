import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRoutes'
import AuthRoutes from './AuthRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/dashboard1'
    },
    MainRoutes,
    AuthRoutes,
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/authentication/Error.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Skip authentication in development
  if (import.meta.env.DEV) {
    return next()
  }

  // Add any authentication logic here
  const publicPages = ['/auth/login', '/auth/register', '/auth/forgot-password']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/auth/login')
  }

  next()
})

// Route title handling
router.afterEach((to) => {
  const baseTitle = 'Soulvation'
  document.title = to.meta.title 
    ? `${to.meta.title} | ${baseTitle}`
    : baseTitle
})

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
  // Handle route errors (e.g., chunk loading failures)
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.reload()
  }
})

export default router
