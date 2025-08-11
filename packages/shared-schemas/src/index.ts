import { z } from 'zod';

export const UUIDSchema = z.string().uuid();
export const ISODateTime = z.string().datetime({ offset: true });

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

export const SortParamSchema = z.string().regex(/^[a-zA-Z0-9_]+:(asc|desc)$/);

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    total: z.number().int().min(0),
    page: z.number().int().min(1),
    limit: z.number().int().min(1).max(100),
  });

// Minimal product domain used soon in T4 (non-breaking now)
export const ProductImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().nullish(),
});
export const ProductVariantSchema = z.object({
  price: z.union([z.number(), z.string()]), // IRR; allow number/string for now
  title: z.string().nullish(),
});
export const ProductSchema = z.object({
  id: UUIDSchema,
  slug: z.string(),
  title: z.string(),
  images: z.array(ProductImageSchema).optional(),
  variants: z.array(ProductVariantSchema).optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;

