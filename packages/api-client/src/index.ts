import createClient from 'openapi-fetch';
import type { paths } from './schema';

type GetTokenFn = () => string | undefined | Promise<string | undefined>;

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: GetTokenFn;
}

/** Type-safe client based on OpenAPI (openapi-fetch) */
export function createApiClient(opts: ApiClientOptions) {
  const client = createClient<paths>({
    baseUrl: opts.baseUrl,
    fetch: async (url, init) => {
      const headers = new Headers(init?.headers);
      const token = await opts.getAccessToken?.();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      return fetch(url, { ...init, headers, credentials: 'include' });
    },
  });
  return client;
}

export type { paths } from './schema';

