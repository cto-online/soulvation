import { defineStore } from 'pinia';
import router from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { ApiResponse, ErrorResponse } from '@/utils/helpers/fetch-wrapper';

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

interface AuthState {
    user: User | null;
    returnUrl: string | null;
    loading: boolean;
    error: string | null;
}

const AUTH_STORAGE_KEY = 'auth_state';

// Helper functions
const getStoredAuth = (): Partial<AuthState> => {
    try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Check token expiration
            if (parsed.user?.tokenExpires && parsed.user.tokenExpires < Date.now()) {
                sessionStorage.removeItem(AUTH_STORAGE_KEY);
                return {};
            }
            return parsed;
        }
    } catch (error) {
        console.error('Error parsing stored auth:', error);
    }
    return {};
};

const setStoredAuth = (state: Partial<AuthState>) => {
    try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error storing auth:', error);
    }
};

export const useAuthStore = defineStore({
    id: 'auth',
    
    state: (): AuthState => ({
        user: getStoredAuth().user || null,
        returnUrl: null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state): boolean => !!state.user?.token,
        isTokenExpired: (state): boolean => {
            if (!state.user?.tokenExpires) return true;
            return state.user.tokenExpires < Date.now();
        }
    },

    actions: {
        setError(error: string | null) {
            this.error = error;
        },

        async login(credentials: LoginCredentials) {
            try {
                this.loading = true;
                this.error = null;

                const response = await fetchWrapper.post<ApiResponse<User>>('/users/authenticate', credentials);
                
                const user: User = {
                    ...response.data,
                    // Set token expiration to 1 hour from now
                    tokenExpires: Date.now() + 60 * 60 * 1000
                };

                this.user = user;
                setStoredAuth({ user });

                // Redirect
                router.push(this.returnUrl || '/dashboards/dashboard1');
            } catch (error) {
                const err = error as ErrorResponse;
                this.error = err.message || 'Login failed';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                this.loading = true;
                // Optionally call logout endpoint if needed
                // await fetchWrapper.post('/users/logout');
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                this.user = null;
                this.error = null;
                sessionStorage.removeItem(AUTH_STORAGE_KEY);
                router.push('/');
                this.loading = false;
            }
        },

        clearError() {
            this.error = null;
        },

        updateReturnUrl(url: string) {
            this.returnUrl = url;
        }
    }
});
