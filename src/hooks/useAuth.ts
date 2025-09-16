import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authAPI, tokenManager } from '../lib/api';
import { useAuthStore } from '../stores/authStore';

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const useGetMe = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authAPI.getMe,
    enabled: !!tokenManager.getToken(),
    retry: false,
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      tokenManager.setToken(data.data!.token);
      tokenManager.setRefreshToken(data.data!.refreshToken);
      
      queryClient.setQueryData(authKeys.me(), {
        success: true,
        message: 'User data retrieved',
        data: { user: data.data!.user }
      });
    },
    onError: () => {
      tokenManager.clearAll();
    }
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      tokenManager.setToken(data.data!.token);
      tokenManager.setRefreshToken(data.data!.refreshToken);
      
      queryClient.setQueryData(authKeys.me(), {
        success: true,
        message: 'User data retrieved',
        data: { user: data.data!.user }
      });
    },
    onError: () => {
      tokenManager.clearAll();
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      tokenManager.clearAll();
      
      queryClient.clear();
    },
    onError: () => {
      tokenManager.clearAll();
      queryClient.clear();
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authAPI.forgotPassword,
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.resetPassword,
    onSuccess: (data) => {
      tokenManager.setToken(data.data!.token);
      tokenManager.setRefreshToken(data.data!.refreshToken);
      
      queryClient.setQueryData(authKeys.me(), {
        success: true,
        message: 'User data retrieved',
        data: { user: data.data!.user }
      });
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), {
        success: true,
        message: 'User data retrieved',
        data: { user: data.data!.user }
      });
    }
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authAPI.changePassword,
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.deleteAccount,
    onSuccess: () => {
      tokenManager.clearAll();
      queryClient.clear();
    }
  });
};

export const useIsAuthenticated = () => {
  const { data: userData, isLoading } = useGetMe();
  return {
    isAuthenticated: !!userData?.data?.user && !!tokenManager.getToken(),
    user: userData?.data?.user,
    isLoading
  };
};

/**
 * Initialize auth on app start. Consolidated here to reduce separate files.
 */
export const useAuthInit = () => {
  const { setUser, setLoading, setError } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenManager.getToken();
      const { user } = useAuthStore.getState();

      if (!token || user) {
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
