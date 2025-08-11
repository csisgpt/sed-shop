import type { ProductPublicT, CategoryPublicT } from '@sed-shop/shared-schemas';

export type UUID = string;
export type CurrencyCode = 'IRR';
export const DEFAULT_CURRENCY: CurrencyCode = 'IRR';
export type Role = 'customer' | 'staff' | 'admin';

export interface BaseEntity {
  id: UUID;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  deletedAt?: string | null;
}

export interface PaginationQuery {
  page?: number;     // 1-based
  limit?: number;    // 1..100
  cursor?: string;   // optional
}

export type SortDirection = 'asc' | 'desc';
export type SortParam = `${string}:${SortDirection}`;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// T4 product/category types

export type ProductSortField = 'createdAt' | 'title';

export interface ProductListQuery {
  q?: string;
  category?: string; // slug
  minPrice?: number;
  maxPrice?: number;
  sort?: SortParam[];
  page?: number;
  limit?: number;
  published?: boolean;
}

export type ProductListResponse = PaginatedResponse<ProductPublicT>;
export type { ProductPublicT, CategoryPublicT } from '@sed-shop/shared-schemas';

