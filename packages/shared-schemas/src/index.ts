import { z } from 'zod';

export const ImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});
export type Image = z.infer<typeof ImageSchema>;

export const ProductVariantSchema = z.object({
  id: z.string(),
  price: z.number(),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  categoryId: z.string().nullish(),
  published: z.boolean(),
  variants: z.array(ProductVariantSchema).default([]),
  images: z.array(ImageSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: CategorySchema.nullish(),
});
export type Product = z.infer<typeof ProductSchema>;
