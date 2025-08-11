import type { Product } from '@sed-shop/shared-schemas'
import { defineStore } from 'pinia'
import { useRuntimeConfig, useFetch } from '#imports'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false as boolean
  }),
  actions: {
    async fetchAll() {
      if (this.loading) return
      this.loading = true
      const {
        public: { apiBase }
      } = useRuntimeConfig()
      const { data } = await useFetch<Product[]>(`${apiBase}/v1/products`)
      this.products = data.value ?? []
      this.loading = false
    }
  }
})

