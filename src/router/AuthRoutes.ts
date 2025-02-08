import type { RouteRecordRaw } from 'vue-router'

const AuthRoutes: RouteRecordRaw = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'Login',
      component: () => import('@/views/authentication/BoxedLogin.vue'),
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/views/authentication/BoxedRegister.vue'),
      meta: {
        title: 'Register',
        requiresAuth: false
      }
    },
    {
      path: 'forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/authentication/BoxedForgotPassword.vue'),
      meta: {
        title: 'Forgot Password',
        requiresAuth: false
      }
    },
    {
      path: 'two-step',
      name: 'TwoStep',
      component: () => import('@/views/authentication/BoxedTwoStep.vue'),
      meta: {
        title: 'Two Step Verification',
        requiresAuth: false
      }
    },
    {
      path: 'maintenance',
      name: 'Maintenance',
      component: () => import('@/views/authentication/Maintenance.vue'),
      meta: {
        title: 'Maintenance',
        requiresAuth: false
      }
    },
    {
      path: 'error',
      name: 'Error',
      component: () => import('@/views/authentication/Error.vue'),
      meta: {
        title: 'Error',
        requiresAuth: false
      }
    }
  ]
}

export default AuthRoutes