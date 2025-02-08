import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
    ApiResponse,
    ApiError,
    ApiRequestConfig,
    ApiRequestInterceptor,
    ApiResponseInterceptor
} from './types';
import { getEndpointConfig, getEndpointUrl } from './endpoints';

class ApiService {
    private instance: AxiosInstance;
    private requestInterceptors: ApiRequestInterceptor[] = [];
    private responseInterceptors: ApiResponseInterceptor[] = [];

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            async (config) => {
                const apiConfig = config as ApiRequestConfig;
                
                // Run through all request interceptors
                for (const interceptor of this.requestInterceptors) {
                    try {
                        const result = await interceptor.onFulfilled(apiConfig);
                        Object.assign(apiConfig, result);
                    } catch (error) {
                        if (interceptor.onRejected) {
                            return interceptor.onRejected(error as AxiosError);
                        }
                        throw error;
                    }
                }

                return apiConfig;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            async (response) => {
                // Run through all response interceptors
                for (const interceptor of this.responseInterceptors) {
                    try {
                        response = await interceptor.onFulfilled(response);
                    } catch (error) {
                        if (interceptor.onRejected) {
                            return interceptor.onRejected(error as AxiosError<ApiError>);
                        }
                        throw error;
                    }
                }

                return response;
            },
            async (error: AxiosError<ApiError>) => {
                // Run through all response interceptors
                for (const interceptor of this.responseInterceptors) {
                    if (interceptor.onRejected) {
                        try {
                            return await interceptor.onRejected(error);
                        } catch (e) {
                            error = e as AxiosError<ApiError>;
                        }
                    }
                }

                return Promise.reject(this.normalizeError(error));
            }
        );
    }

    private normalizeError(error: AxiosError<ApiError>): ApiError {
        return {
            message: error.response?.data?.message || error.message || 'An unknown error occurred',
            status: error.response?.status || 500,
            code: error.response?.data?.code,
            details: error.response?.data?.details
        };
    }

    public addRequestInterceptor(interceptor: ApiRequestInterceptor): void {
        this.requestInterceptors.push(interceptor);
    }

    public addResponseInterceptor(interceptor: ApiResponseInterceptor): void {
        this.responseInterceptors.push(interceptor);
    }

    public async request<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.request<ApiResponse<T>>(config);
            return response.data;
        } catch (error) {
            throw this.normalizeError(error as AxiosError<ApiError>);
        }
    }

    public async execute<T = unknown>(
        group: string,
        endpoint: string,
        params?: Record<string, string>,
        data?: unknown,
        config: Partial<ApiRequestConfig> = {}
    ): Promise<ApiResponse<T>> {
        const endpointConfig = getEndpointConfig(group, endpoint);
        const url = getEndpointUrl(endpointConfig.url, params);

        return this.request<T>({
            ...config,
            url,
            method: endpointConfig.method,
            data,
            skipAuth: endpointConfig.skipAuth,
            skipErrorHandling: endpointConfig.skipErrorHandling
        });
    }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Export class for testing purposes
export type { ApiService };