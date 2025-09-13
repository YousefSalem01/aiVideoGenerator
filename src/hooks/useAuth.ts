import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI, tokenManager } from '../lib/api';

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
