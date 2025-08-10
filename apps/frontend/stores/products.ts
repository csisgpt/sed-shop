import { defineStore } from 'pinia';
import type { Product, Category } from '@sed-shop/shared-schemas';

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [] as Product[],
    categories: [] as Category[],
    loading: false,
  }),
  actions: {
    async fetchProducts(category?: string) {
      this.loading = true;
      const config = useRuntimeConfig();
      const query = category ? `?category=${category}` : '';
      const { data } = await useFetch<Product[]>(`${config.public.apiBase}/products${query}`);
      this.items = data.value ?? [];
      this.loading = false;
    },
    async fetchCategories() {
      const config = useRuntimeConfig();
      const { data } = await useFetch<Category[]>(`${config.public.apiBase}/categories`);
      this.categories = data.value ?? [];
    },
  },
});
