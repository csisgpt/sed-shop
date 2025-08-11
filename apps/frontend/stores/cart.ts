import { defineStore } from 'pinia';

type CartLine = { productId: string; variantId: string; quantity: number };

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartLine[],
  }),
});
