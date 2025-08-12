import createClient from 'openapi-fetch';
import type { paths } from './schema';

type GetTokenFn = () => string | undefined | Promise<string | undefined>;

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: GetTokenFn;
}

/**
 * Type-safe client based on OpenAPI (openapi-fetch).
 * - Uses a strictly-typed fetch wrapper (no implicit any)
 * - Sends Authorization: Bearer <token> when available
 * - Always includes credentials:'include'
 */
export function createApiClient(opts: ApiClientOptions) {
  const client = createClient<paths>({
    baseUrl: opts.baseUrl,
    fetch: async (...args: Parameters<typeof fetch>) => {
      const [input, init] = args;
      const headers = new Headers(init?.headers as HeadersInit | undefined);
      const token = await opts.getAccessToken?.();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      return fetch(input as RequestInfo, {
        ...(init ?? {}),
        headers,
        credentials: 'include',
      });
    },
  });
  return client;
}

export type { paths } from './schema';
