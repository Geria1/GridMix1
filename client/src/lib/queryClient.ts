import { QueryClient } from '@tanstack/react-query';
import { getApiUrl } from '@/config/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      queryFn: async ({ queryKey }) => {
        const endpoint = queryKey[0] as string;
        const params = queryKey[1];

        let url = getApiUrl(endpoint);
        if (params && typeof params === 'object') {
          const searchParams = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          );
          url = `${url}?${searchParams}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      },
    },
  },
});
