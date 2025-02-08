import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/auth';

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    errors?: Record<string, string[]>;
}

const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred';

export const errorInterceptor = async (error: AxiosError<any>): Promise<never> => {
    const { logout } = useAuthStore();

    // Network errors
    if (!error.response) {
        return Promise.reject({
            message: 'Network error - please check your connection',
            status: 0
        });
    }

    const { status, data } = error.response;

    // Handle authentication errors
    if (status === 401) {
        logout();
        return Promise.reject({
            message: 'Your session has expired. Please log in again.',
            status: 401
        });
    }

    // Handle forbidden errors
    if (status === 403) {
        return Promise.reject({
            message: 'You do not have permission to perform this action',
            status: 403
        });
    }

    // Handle validation errors
    if (status === 422 && data?.errors) {
        const validationErrors = Object.values(data.errors)
            .flat()
            .join(', ');
        
        return Promise.reject({
            message: validationErrors || 'Validation failed',
            status: 422,
            errors: data.errors
        });
    }

    // Handle rate limiting
    if (status === 429) {
        return Promise.reject({
            message: 'Too many requests. Please try again later.',
            status: 429
        });
    }

    // Handle server errors
    if (status >= 500) {
        return Promise.reject({
            message: 'Server error. Please try again later.',
            status
        });
    }

    // Handle other errors
    return Promise.reject({
        message: data?.message || error.message || DEFAULT_ERROR_MESSAGE,
        status: status || 500,
        code: data?.code
    });
};