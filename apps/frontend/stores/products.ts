import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#imports'
import { formatIRR } from '~/utils/currency'

interface Product {
  id: string
  slug: string
  title: string
  price: number
  image: string
}

interface ListParams {
  page?: number
  limit?: number
  search?: string
  sort?: string
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [] as Product[],
    isLoading: false,
    error: null as string | null
  }),
  getters: {
    byId: (state) => (id: string) => state.items.find((p) => p.id === id),
    formattedItems: (state) => state.items.map((p) => ({ ...p, price: formatIRR(p.price) }))
  },
  actions: {
    async fetchList(params: ListParams) {
      this.isLoading = true
      const config = useRuntimeConfig()
      try {
        const res = await $fetch<{ items: Product[] }>(`${config.public.apiBase}/mock/products`, {
          params
        })
        this.items = res.items
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.isLoading = false
      }
    },
    async fetchBySlug(slug: string) {
      const config = useRuntimeConfig()
      try {
        const product = await $fetch<Product>(`${config.public.apiBase}/mock/products/${slug}`)
        return product
      } catch (e: any) {
        this.error = e.message
        return null
      }
    }
  }
})
