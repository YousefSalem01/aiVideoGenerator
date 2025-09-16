import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Toast } from '../components/ui/Toast';
import { authAPI, tokenManager, User } from '../lib/api';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authAPI.login({ email, password });
          
          if (response.success && response.data) {
            tokenManager.setToken(response.data.token);
            tokenManager.setRefreshToken(response.data.refreshToken);
            
            set({ 
              user: response.data.user, 
              isLoading: false,
              error: null 
            });
            
            Toast.success('Welcome back!');
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: unknown) {
          const apiError = error as ApiError;
          const errorMessage = apiError.response?.data?.message || apiError.message || 'Login failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            user: null 
          });
          throw error;
        }
      },

      signup: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authAPI.register({ name, email, password });
          
          if (response.success && response.data) {
            tokenManager.setToken(response.data.token);
            tokenManager.setRefreshToken(response.data.refreshToken);
            
            set({ 
              user: response.data.user, 
              isLoading: false,
              error: null 
            });
            
            Toast.success(`Welcome to AI VideoGen, ${response.data.user.name}!`);
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: unknown) {
          const apiError = error as ApiError;
          const errorMessage = apiError.response?.data?.message || apiError.message || 'Registration failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            user: null 
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          tokenManager.clearAll();
          set({ user: null, error: null });
          Toast.success('Logged out successfully');
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          
          await authAPI.forgotPassword(email);
          
          set({ isLoading: false });
          Toast.success('Password reset email sent! Check your inbox.');
        } catch (error: unknown) {
          const apiError = error as ApiError;
          const errorMessage = apiError.response?.data?.message || apiError.message || 'Password reset failed';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          throw error;
        }
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
