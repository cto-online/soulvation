import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export interface ProgressEvent {
    loaded: number;
    total: number;
    progress: number;
    bytes: number;
    rate: number;
    estimated: number;
}

type ProgressCallback = (progressEvent: ProgressEvent) => void;

const calculateProgress = (progressEvent: any): ProgressEvent => {
    const { loaded, total } = progressEvent;
    const progress = total ? Math.round((loaded * 100) / total) : 0;
    const rate = loaded / ((Date.now() - progressEvent.timeStamp) / 1000);
    const estimated = total ? (total - loaded) / rate : 0;

    return {
        loaded,
        total,
        progress,
        bytes: loaded,
        rate,
        estimated
    };
};

export const setupProgressInterceptor = (
    instance: AxiosInstance,
    onUploadProgress?: ProgressCallback,
    onDownloadProgress?: ProgressCallback
) => {
    // Request interceptor to add start time
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        if (onUploadProgress && config.onUploadProgress) {
            const original = config.onUploadProgress;
            config.onUploadProgress = (progressEvent: any) => {
                const calculated = calculateProgress(progressEvent);
                onUploadProgress(calculated);
                original(progressEvent);
            };
        }
        return config;
    });

    // Response interceptor to track download progress
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            if (onDownloadProgress && response.config.onDownloadProgress) {
                const original = response.config.onDownloadProgress;
                response.config.onDownloadProgress = (progressEvent: any) => {
                    const calculated = calculateProgress(progressEvent);
                    onDownloadProgress(calculated);
                    original(progressEvent);
                };
            }
            return response;
        },
        error => Promise.reject(error)
    );
};