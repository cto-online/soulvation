import { AxiosError } from 'axios';

export interface RetryConfig {
    retries: number;
    retryDelay: number;
    retryCondition: (error: AxiosError) => boolean;
    onRetry?: (retryCount: number, error: AxiosError) => void;
}

export const retryConfig: RetryConfig = {
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error: AxiosError): boolean => {
        // Don't retry if we have a response and it's not a server error
        if (error.response) {
            return error.response.status >= 500 && error.response.status <= 599;
        }

        // Retry network errors (no response)
        return true;
    },
    onRetry: (retryCount: number, error: AxiosError) => {
        console.warn(
            `Retrying request (attempt ${retryCount + 1}/3) due to ${error.message}`
        );
    }
};

// Exponential backoff with jitter
export const calculateRetryDelay = (retryCount: number, initialDelay: number): number => {
    const exp = Math.min(retryCount, 31); // Prevent potential overflow
    const baseDelay = initialDelay * Math.pow(2, exp);
    const jitter = Math.random() * 0.1 * baseDelay; // Add up to 10% jitter
    return Math.min(baseDelay + jitter, 30000); // Cap at 30 seconds
};

// Helper to determine if error is retryable
export const isRetryableError = (error: AxiosError): boolean => {
    // Don't retry client errors
    if (error.response?.status && error.response.status < 500) {
        return false;
    }

    // Retry network errors and server errors
    return !error.response || (error.response.status >= 500 && error.response.status < 600);
};