import { defineStore } from 'pinia'
import type { Product } from '@sed-shop/shared-schemas'

interface State {
  items: Product[]
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    items: []
  }),
  actions: {
    async fetchProducts() {
      const config = useRuntimeConfig()
      const data = await $fetch<Product[]>(`${config.public.apiBase}/products`)
      this.items = data.map((p: any) => ({ ...p, priceRial: Number(p.priceRial ?? p.price ?? 0) }))
    },
    async fetchProduct(slug: string) {
      const config = useRuntimeConfig()
      const product = await $fetch<Product>(`${config.public.apiBase}/products/${slug}`)
      return { ...product, priceRial: Number((product as any).priceRial ?? (product as any).price ?? 0) } as Product
    }
  }
})
