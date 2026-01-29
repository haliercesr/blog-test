import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'https://dummyjson.com';
// dummyjson.com does not require an app-id, so it's removed.

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          console.error('[API] Unauthorized');
          break;
        case 403:
          console.error('[API] Forbidden - Access denied');
          break;
        case 404:
          console.error('[API] Resource not found');
          break;
        case 500:
          console.error('[API] Server error');
          break;
        default:
          console.error(`[API] Error ${status}`);
      }
    } else if (error.request) {
      console.error('[API] No response received', error.request);
    } else {
      console.error('[API] Request setup error', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;