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

// T4: public schemas for products & categories
export const MoneyInt = z.number().int().min(0);

export const ProductImagePublic = z.object({
  url: z.string().url(),
  alt: z.string().nullish(),
  position: z.number().int().min(0).optional(),
});
export const ProductVariantPublic = z.object({
  id: z.string().uuid(),
  sku: z.string().nullish(),
  price: MoneyInt,
  compareAtPrice: z.number().int().min(0).nullish(),
  stock: z.number().int(),
});
export const CategoryPublic = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().uuid().nullish(),
});
export const ProductPublic = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  published: z.boolean(),
  category: CategoryPublic.nullish(),
  images: z.array(ProductImagePublic).optional(),
  variants: z.array(ProductVariantPublic).optional(),
  minPrice: MoneyInt.optional(),
  maxPrice: MoneyInt.optional(),
});
export type ProductPublicT = z.infer<typeof ProductPublic>;
export type CategoryPublicT = z.infer<typeof CategoryPublic>;

