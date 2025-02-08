import { AxiosAdapter, AxiosError } from 'axios';

export interface RetryConfig {
    retries: number;
    retryDelay: number;
    retryCondition: (error: AxiosError) => boolean;
}

export const defaultRetryConfig: RetryConfig = {
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error: AxiosError) => {
        // Retry on network errors or 5xx server errors
        return !error.response || (error.response.status >= 500 && error.response.status <= 599);
    }
};

export function retryAdapterEnhancer(adapter: AxiosAdapter, config: Partial<RetryConfig> = {}) {
    const retryConfig: RetryConfig = {
        ...defaultRetryConfig,
        ...config
    };

    return async (config: any) => {
        const { retries, retryDelay, retryCondition } = retryConfig;
        let lastError: AxiosError | null = null;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await adapter(config);
            } catch (err) {
                lastError = err as AxiosError;

                // Check if we should retry
                if (attempt === retries || !retryCondition(lastError)) {
                    throw lastError;
                }

                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }

        throw lastError;
    };
}