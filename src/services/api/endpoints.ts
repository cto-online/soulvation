import type { ApiEndpoints } from './types';

export const API_ENDPOINTS: ApiEndpoints = {
    auth: {
        login: {
            url: '/users/authenticate',
            method: 'POST',
            skipAuth: true
        },
        logout: {
            url: '/users/logout',
            method: 'POST'
        },
        refresh: {
            url: '/users/refresh-token',
            method: 'POST'
        }
    },
    users: {
        getProfile: {
            url: '/users/profile',
            method: 'GET'
        },
        updateProfile: {
            url: '/users/profile',
            method: 'PUT'
        }
    }
    // Add other endpoint groups as needed
};

// Helper to get full endpoint URL with parameters
export const getEndpointUrl = (url: string, params?: Record<string, string>): string => {
    if (!params) return url;
    
    return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`:${key}`, encodeURIComponent(value));
    }, url);
};

// Helper to get endpoint configuration
export const getEndpointConfig = (
    group: keyof ApiEndpoints,
    endpoint: string
): ApiEndpoints[typeof group][typeof endpoint] => {
    const config = API_ENDPOINTS[group]?.[endpoint as keyof ApiEndpoints[typeof group]];
    if (!config) {
        throw new Error(`Endpoint ${group}.${endpoint} not found`);
    }
    return config;
};