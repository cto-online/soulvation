// Public routes accessible to all users
export const publicRoutes = [
    {
        path: '/',
        redirect: '/discover',
        meta: { requiresAuth: false }
    },
    {
        path: '/discover',
        name: 'discover',
        component: () => import('@/views/DiscoverView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/reflect',
        name: 'reflect',
        component: () => import('@/views/ReflectView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/play',
        name: 'play',
        component: () => import('@/views/PlayView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/connect',
        name: 'connect',
        component: () => import('@/views/ConnectView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/learn',
        name: 'learn',
        component: () => import('@/views/LearnView.vue'),
        meta: { requiresAuth: false }
    }
];
// Protected routes requiring authentication
export const protectedRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/avatar',
        name: 'avatar',
        component: () => import('@/views/AvatarView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/scenarios',
        name: 'scenarios',
        component: () => import('@/views/ScenariosView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/progress',
        name: 'progress',
        component: () => import('@/views/ProgressView.vue'),
        meta: { requiresAuth: true }
    }
];
// Auth routes for guest users
export const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/auth/SignupView.vue'),
        meta: { requiresGuest: true }
    }
];
// Combine all routes
export const routes = [
    ...publicRoutes,
    ...protectedRoutes,
    ...authRoutes,
    // 404 route handler
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { requiresAuth: false }
    }
];
