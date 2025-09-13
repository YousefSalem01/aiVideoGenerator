import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authAPI, tokenManager } from '../lib/api';

/**
 * Hook to initialize authentication state on app startup
 * Checks for existing tokens and validates them with the server
 */
export const useAuthInit = () => {
  const { setUser, setLoading, setError } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenManager.getToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await authAPI.getMe();
        
        if (response.success && response.data) {
          setUser(response.data.user);
        } else {
          tokenManager.clearAll();
          setUser(null);
        }
      } catch (error: unknown) {
        console.error('Auth initialization failed:', error);
        
        const apiError = error as { response?: { status?: number } };
        if (apiError.response?.status === 401) {
          tokenManager.clearAll();
          setUser(null);
        }
        
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, setLoading, setError]);
};
