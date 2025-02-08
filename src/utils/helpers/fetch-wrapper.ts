import { useAuthStore } from '@/stores/auth';
import axios, { 
    AxiosError, 
    AxiosInstance, 
    AxiosRequestConfig, 
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';

// Types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

export interface ErrorResponse {
    message: string;
    status: number;
}

// Retry configuration
const RETRY_COUNT = 3;
const RETRY_DELAY = 1000; // ms

// Create axios instance with default config
const api: AxiosInstance = axios.create({
    // Update baseURL to point to Kong Gateway
    baseURL: import.meta.env.VITE_KONG_URL || 'http://localhost:8000',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        // Add Kong-specific headers
        'X-Request-ID': crypto.randomUUID()
    }
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { user } = useAuthStore();
        if (user?.token) {
            config.headers.set('Authorization', `Bearer ${user.token}`);
        }

        // Add Kong authentication key if available
        const kongApiKey = import.meta.env.VITE_KONG_API_KEY;
        if (kongApiKey) {
            config.headers.set('apikey', kongApiKey);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Helper function for retry logic
const retryRequest = async (
    error: AxiosError,
    retryCount: number = 0
): Promise<AxiosResponse> => {
    // Only retry on network errors or 5xx responses
    if (
        retryCount < RETRY_COUNT &&
        (!error.response || (error.response.status >= 500 && error.response.status < 600))
    ) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount)));
        const config = error.config as AxiosRequestConfig;
        return api.request(config).catch(err => retryRequest(err, retryCount + 1));
    }
    return Promise.reject(error);
};

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<{ message?: string }>) => {
        const { user, logout } = useAuthStore();
        
        // Handle unauthorized errors
        if (error.response?.status === 401) {
            if (user) {
                logout();
            }
        }
        
        // Handle forbidden errors
        if (error.response?.status === 403) {
            logout();
        }

        // Try to retry the request if applicable
        try {
            const response = await retryRequest(error);
            return response;
        } catch (retryError) {
            // Format error response
            const errorResponse: ErrorResponse = {
                message: error.response?.data?.message || error.message || 'An error occurred',
                status: error.response?.status || 500
            };

            return Promise.reject(errorResponse);
        }
    }
);

// API wrapper with typed methods
export const fetchWrapper = {
    get: <T>(url: string, config?: AxiosRequestConfig) => 
        api.get<T>(url, config).then(response => response.data),
    
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
        api.post<T>(url, data, config).then(response => response.data),
    
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
        api.put<T>(url, data, config).then(response => response.data),
    
    delete: <T>(url: string, config?: AxiosRequestConfig) => 
        api.delete<T>(url, config).then(response => response.data),
    
    // Helper method for handling multiple concurrent requests
    all: <T>(promises: Promise<T>[]) => Promise.all(promises)
};
