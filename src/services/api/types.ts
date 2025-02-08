import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API types
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    status: number;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: Record<string, unknown>;
}

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request/Response types
export interface ApiRequestConfig extends AxiosRequestConfig {
    skipAuth?: boolean;
    skipErrorHandling?: boolean;
}

export interface ApiRequestInterceptor {
    onFulfilled: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
    onRejected?: (error: AxiosError) => Promise<never>;
}

export interface ApiResponseInterceptor {
    onFulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (error: AxiosError<ApiError>) => Promise<never>;
}

// Endpoint configuration types
export interface ApiEndpointConfig {
    url: string;
    method: HttpMethod;
    skipAuth?: boolean;
    skipErrorHandling?: boolean;
}

export interface ApiEndpoints {
    auth: {
        login: ApiEndpointConfig;
        logout: ApiEndpointConfig;
        refresh: ApiEndpointConfig;
    };
    users: {
        getProfile: ApiEndpointConfig;
        updateProfile: ApiEndpointConfig;
    };
    // Add other endpoint groups as needed
}