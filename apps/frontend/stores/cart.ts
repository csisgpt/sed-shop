import { defineStore } from 'pinia'
import { formatIRR } from '~/utils/currency'

interface CartItem {
  productId: string
  variantId?: string
  qty: number
  price_snapshot: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  actions: {
    load() {
      if (process.client) {
        const raw = localStorage.getItem('cart')
        this.items = raw ? JSON.parse(raw) : []
      }
    },
    save() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },
    add(item: CartItem) {
      const existing = this.items.find((i) => i.productId === item.productId)
      if (existing) {
        existing.qty += item.qty
      } else {
        this.items.push(item)
      }
      this.save()
    },
    remove(productId: string) {
      this.items = this.items.filter((i) => i.productId !== productId)
      this.save()
    },
    update(productId: string, qty: number) {
      const target = this.items.find((i) => i.productId === productId)
      if (target) {
        target.qty = qty
        this.save()
      }
    },
    clear() {
      this.items = []
      this.save()
    },
    total() {
      const sum = this.items.reduce((acc, i) => acc + Number(i.price_snapshot) * i.qty, 0)
      return formatIRR(sum)
    }
  }
})
