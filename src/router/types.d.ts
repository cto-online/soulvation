import type { RouteRecordRaw } from 'vue-router';
export interface RouteMeta {
    requiresAuth?: boolean;
    requiresGuest?: boolean;
}
export type AppRouteRecordRaw = RouteRecordRaw;
