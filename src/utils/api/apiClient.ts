import axios, { 
    AxiosError, 
    AxiosInstance, 
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    CancelTokenSource
} from 'axios';
import { useAuthStore } from '@/stores/auth';
import { retryConfig, calculateRetryDelay } from '@/utils/api/config/retryConfig';
import { setupProgressInterceptor } from '@/utils/api/interceptors/progressInterceptor';
import { errorInterceptor } from '@/utils/api/interceptors/errorInterceptor';
import { cacheConfig, cacheManager } from '@/utils/api/config/cacheConfig';

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

export interface ErrorResponse {
    message: string;
    status: number;
    code?: string;
}

// Create base axios instance
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    return instance;
};

class ApiClient {
    private instance: AxiosInstance;
    private cancelTokens: Map<string, CancelTokenSource>;

    constructor() {
        this.instance = createAxiosInstance();
        this.cancelTokens = new Map();
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const { user } = useAuthStore();
                if (user?.token) {
                    config.headers.set('Authorization', `Bearer ${user.token}`);
                }

                // Check cache for GET requests
                if (config.method?.toLowerCase() === 'get') {
                    const cachedResponse = cacheConfig.getCachedResponse(config);
                    if (cachedResponse) {
                        return Promise.reject({
                            config,
                            response: { data: cachedResponse },
                            isCache: true
                        });
                    }
                }

                // Add cancel token
                const source = axios.CancelToken.source();
                this.cancelTokens.set(config.url!, source);
                config.cancelToken = source.token;

                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Cache successful GET responses
                if (response.config.method?.toLowerCase() === 'get') {
                    cacheConfig.setCachedResponse(response.config, response.data);
                }
                return response;
            },
            async (error: any) => {
                // Return cached response if available
                if (error.isCache) {
                    return error.response;
                }

                // Handle retry logic
                if (retryConfig.retryCondition(error)) {
                    let retryCount = 0;
                    const maxRetries = retryConfig.retries;

                    while (retryCount < maxRetries) {
                        try {
                            const delay = calculateRetryDelay(retryCount, retryConfig.retryDelay);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            
                            retryConfig.onRetry?.(retryCount, error);
                            return await this.instance.request(error.config);
                        } catch (retryError) {
                            retryCount++;
                            if (retryCount === maxRetries) {
                                return errorInterceptor(retryError as AxiosError);
                            }
                        }
                    }
                }

                return errorInterceptor(error);
            }
        );

        // Add progress tracking
        setupProgressInterceptor(this.instance);
    }

    // Cancel a specific request
    public cancelRequest(url: string): void {
        const source = this.cancelTokens.get(url);
        if (source) {
            source.cancel(`Request to ${url} was cancelled`);
            this.cancelTokens.delete(url);
        }
    }

    // Cancel all pending requests
    public cancelAllRequests(): void {
        this.cancelTokens.forEach((source, url) => {
            source.cancel(`Request to ${url} was cancelled`);
        });
        this.cancelTokens.clear();
    }

    // Clear cache
    public clearCache(): void {
        cacheManager.clear();
    }

    // Generic request method with type safety
    public async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.instance.request<T>(config);
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                throw new Error('Request was cancelled');
            }
            throw error;
        }
    }

    // Convenience methods
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    // Helper for concurrent requests
    public async all<T>(promises: Promise<T>[]): Promise<T[]> {
        return Promise.all(promises);
    }
}

// Export singleton instance
export const apiClient = new ApiClient();