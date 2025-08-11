import { defineStore } from 'pinia'
import { useRuntimeConfig, useFetch } from '#imports'

export type ProductImage = { url: string; alt?: string | null }
export type ProductVariant = { price: number | string; title?: string | null }
export type Product = { id: string; slug: string; title: string; images?: ProductImage[]; variants?: ProductVariant[] }

export const useProductsStore = defineStore('products', {
  state: () => ({ products: [] as Product[], bySlug: new Map<string, Product>() }),
  actions: {
    async fetchAll() {
      const { public: { apiBase } } = useRuntimeConfig()
      const { data, error } = await useFetch<Product[]>(`${apiBase}/products`)
      if (error.value) throw error.value
      this.products = data.value ?? []
      this.products.forEach(p => this.bySlug.set(p.slug, p))
    },
    async fetchBySlug(slug: string) {
      if (this.bySlug.has(slug)) return this.bySlug.get(slug)!
      const { public: { apiBase } } = useRuntimeConfig()
      const { data, error } = await useFetch<Product>(`${apiBase}/products/${slug}`)
      if (error.value) throw error.value
      const p = data.value!
      this.bySlug.set(slug, p)
      return p
    }
  }
})
