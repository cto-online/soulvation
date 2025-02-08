import { defineStore } from 'pinia';
import router from '@/router';
import { authService } from '@/services/auth/authService';
import type { ApiError } from '@/services/api/types';

// Types
export interface User {
    id: number;
    username: string;
    email: string;
    token?: string;
    tokenExpires?: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', () => {
    // State
    const state = {
        user: null as User | null,
        returnUrl: null as string | null,
        loading: false,
        error: null as ApiError | null
    };

    // Getters
    const isAuthenticated = () => authService.isAuthenticated() && !!state.user;

    // Actions
    const setError = (error: ApiError | null) => {
        state.error = error;
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            state.loading = true;
            state.error = null;

            const user = await authService.login(credentials);
            state.user = user;

            // Redirect to return url or default route
            router.push(state.returnUrl || '/dashboards/dashboard1');
        } catch (error) {
            state.error = error as ApiError;
            throw error;
        } finally {
            state.loading = false;
        }
    };

    const logout = async () => {
        try {
            state.loading = true;
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            state.user = null;
            state.error = null;
            router.push('/');
            state.loading = false;
        }
    };

    const clearError = () => {
        state.error = null;
    };

    const updateReturnUrl = (url: string) => {
        state.returnUrl = url;
    };

    return {
        // State
        ...state,

        // Getters
        isAuthenticated,

        // Actions
        setError,
        login,
        logout,
        clearError,
        updateReturnUrl
    };
});

// Add persistence plugin configuration
useAuthStore.$persist = {
    enabled: true,
    storage: window.localStorage,
    paths: ['user', 'returnUrl']
};
