import { AxiosRequestConfig } from 'axios';

interface CacheItem {
    data: any;
    timestamp: number;
    expiresIn: number;
}

class CacheManager {
    private cache: Map<string, CacheItem>;
    private readonly defaultTTL: number;

    constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default TTL
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    private generateCacheKey(config: AxiosRequestConfig): string {
        const { method, url, params, data } = config;
        return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`;
    }

    get(config: AxiosRequestConfig): any | null {
        const key = this.generateCacheKey(config);
        const item = this.cache.get(key);

        if (!item) return null;

        const now = Date.now();
        if (now - item.timestamp > item.expiresIn) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    set(config: AxiosRequestConfig, data: any, ttl: number = this.defaultTTL): void {
        const key = this.generateCacheKey(config);
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            expiresIn: ttl
        });
    }

    clear(): void {
        this.cache.clear();
    }

    delete(config: AxiosRequestConfig): void {
        const key = this.generateCacheKey(config);
        this.cache.delete(key);
    }
}

export const cacheManager = new CacheManager();

export const cacheConfig = {
    // Cache GET requests by default
    shouldCache: (config: AxiosRequestConfig): boolean => {
        return config.method?.toLowerCase() === 'get';
    },

    // Get cached response
    getCachedResponse: (config: AxiosRequestConfig) => {
        return cacheManager.get(config);
    },

    // Store response in cache
    setCachedResponse: (config: AxiosRequestConfig, response: any) => {
        if (cacheConfig.shouldCache(config)) {
            const ttl = config.headers?.['cache-control']
                ? parseCacheControl(config.headers['cache-control'])
                : undefined;
            cacheManager.set(config, response, ttl);
        }
    }
};

// Helper to parse Cache-Control header
function parseCacheControl(header: string): number | undefined {
    const matches = header.match(/max-age=(\d+)/);
    if (matches) {
        return parseInt(matches[1], 10) * 1000; // Convert to milliseconds
    }
    return undefined;
}