import { API_TIMEOUT, ROUTES, STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/utils';
import { ApiResponse } from '@/types';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    if (response.data && typeof response.data === 'object') {
      if ('success' in response.data && 'data' in response.data) {
        response.data = response.data.data as any;
      }
    }
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);

      if (refreshToken && !error.config?.url?.includes('/auth/refresh')) {
        try {
          const response = await axios.post<ApiResponse<{ access_token: string }>>(
            `${API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const accessToken = response.data.data?.access_token;

          if (accessToken) {
            storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

            if (error.config) {
              error.config.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient.request(error.config);
            }
          }
        } catch (refreshError) {
          storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
          storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
          storage.remove(STORAGE_KEYS.MERCHANT);

          if (typeof window !== 'undefined') {
            window.location.href = ROUTES.LOGIN;
          }
        }
      } else {
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.MERCHANT);

        if (typeof window !== 'undefined') {
          window.location.href = ROUTES.LOGIN;
        }
      }
    }

    if (error.response?.data) {
      const errorData = error.response.data as any;
      if (errorData.message) {
        error.message = errorData.message;
      }
    }

    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;