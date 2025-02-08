import { apiService } from '../api/apiService';
import type { ApiResponse } from '../api/types';
import type { User, LoginCredentials } from '@/stores/auth';

const TOKEN_STORAGE_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

interface TokenData {
    token: string;
    expiresAt: number;
}

class AuthService {
    private tokenData: TokenData | null = null;

    constructor() {
        // Initialize token interceptor
        apiService.addRequestInterceptor({
            onFulfilled: (config) => {
                if (config.skipAuth) return config;

                const token = this.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }
        });

        // Initialize response interceptor for token expiry
        apiService.addResponseInterceptor({
            onFulfilled: (response) => response,
            onRejected: async (error) => {
                if (error.response?.status === 401 && this.tokenData) {
                    // Clear token on 401
                    this.clearToken();
                }
                throw error;
            }
        });

        // Load token from storage on initialization
        this.loadTokenFromStorage();
    }

    private loadTokenFromStorage(): void {
        try {
            const token = localStorage.getItem(TOKEN_STORAGE_KEY);
            const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);

            if (token && expiryStr) {
                const expiresAt = parseInt(expiryStr, 10);
                
                // Only load if token hasn't expired
                if (expiresAt > Date.now()) {
                    this.tokenData = { token, expiresAt };
                } else {
                    this.clearToken();
                }
            }
        } catch (error) {
            console.error('Error loading token from storage:', error);
            this.clearToken();
        }
    }

    private saveTokenToStorage(tokenData: TokenData): void {
        try {
            localStorage.setItem(TOKEN_STORAGE_KEY, tokenData.token);
            localStorage.setItem(TOKEN_EXPIRY_KEY, tokenData.expiresAt.toString());
        } catch (error) {
            console.error('Error saving token to storage:', error);
        }
    }

    private clearToken(): void {
        this.tokenData = null;
        try {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(TOKEN_EXPIRY_KEY);
        } catch (error) {
            console.error('Error clearing token from storage:', error);
        }
    }

    public getToken(): string | null {
        if (!this.tokenData) return null;
        
        // Check if token has expired
        if (this.tokenData.expiresAt <= Date.now()) {
            this.clearToken();
            return null;
        }

        return this.tokenData.token;
    }

    public isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    public async login(credentials: LoginCredentials): Promise<User> {
        const response = await apiService.execute<User>('auth', 'login', undefined, credentials);
        
        const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now
        this.tokenData = {
            token: response.data.token!,
            expiresAt
        };
        
        this.saveTokenToStorage(this.tokenData);
        
        return response.data;
    }

    public async logout(): Promise<void> {
        try {
            if (this.isAuthenticated()) {
                await apiService.execute('auth', 'logout');
            }
        } finally {
            this.clearToken();
        }
    }

    public async refreshToken(): Promise<void> {
        if (!this.isAuthenticated()) {
            throw new Error('No token to refresh');
        }

        try {
            const response = await apiService.execute<{ token: string }>('auth', 'refresh');
            
            const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now
            this.tokenData = {
                token: response.data.token,
                expiresAt
            };
            
            this.saveTokenToStorage(this.tokenData);
        } catch (error) {
            this.clearToken();
            throw error;
        }
    }
}

// Create and export singleton instance
export const authService = new AuthService();

// Export class for testing purposes
export type { AuthService };