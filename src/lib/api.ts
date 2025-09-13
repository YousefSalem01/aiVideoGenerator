import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { queryClient } from './queryClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  getToken: () => Cookies.get(TOKEN_KEY),
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { 
      expires: 7, // 7 days
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    });
  },
  removeToken: () => Cookies.remove(TOKEN_KEY),
  
  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, { 
      expires: 30, // 30 days
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    });
  },
  removeRefreshToken: () => Cookies.remove(REFRESH_TOKEN_KEY),
  
  clearAll: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
};

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError['config'] & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken
          });

          const { token, refreshToken: newRefreshToken } = response.data.data;
          
          tokenManager.setToken(token);
          tokenManager.setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        tokenManager.clearAll();
        queryClient.clear();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      tokenManager.clearAll();
      queryClient.clear();
    }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'premium';
  isAdmin: boolean;
  connectedPlatforms: string[];
  videosGenerated: number;
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<ApiResponse<{ user: User }>>('/api/auth/me');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post<ApiResponse<{ token: string; refreshToken: string }>>('/api/auth/refresh', {
      refreshToken
    });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse>('/api/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { token: string; password: string }) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/reset-password', data);
    return response.data;
  },

  updateProfile: async (data: { name: string }) => {
    const response = await api.put<ApiResponse<{ user: User }>>('/api/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put<ApiResponse>('/api/auth/change-password', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse>('/api/auth/logout');
    return response.data;
  },

  deleteAccount: async (password: string) => {
    const response = await api.delete<ApiResponse>('/api/auth/account', {
      data: { password }
    });
    return response.data;
  }
};

export default api;
