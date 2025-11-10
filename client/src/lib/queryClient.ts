import { QueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5000';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      queryFn: async ({ queryKey }) => {
        const url = `${API_BASE_URL}${queryKey[0]}`;
        const params = queryKey[1];

        let fullUrl = url;
        if (params && typeof params === 'object') {
          const searchParams = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          );
          fullUrl = `${url}?${searchParams}`;
        }

        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      },
    },
  },
});
