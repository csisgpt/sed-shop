import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  priceRial: z.number().int().nonnegative(),
  imageUrl: z.string().url().nullable().optional()
})
export type Product = z.infer<typeof ProductSchema>
