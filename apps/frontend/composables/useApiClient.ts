import { createApiClient } from '@sed-shop/api-client';

export const useApiClient = () => {
  const config = useRuntimeConfig();
  const api = createApiClient({
    baseUrl: (config.public as any).apiBase || 'http://localhost:3000/api',
    getAccessToken: () => undefined, // T6: to be implemented later
  });
  return api;
};

