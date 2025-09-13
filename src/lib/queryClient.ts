import { QueryClient } from '@tanstack/react-query';

interface ApiError {
  response?: {
    status: number;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const apiError = error as ApiError;
        if (apiError?.response?.status === 401 || apiError?.response?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});
