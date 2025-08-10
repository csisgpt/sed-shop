<template>
  <section class="p-4 text-center">
    <h1 class="text-2xl font-bold mb-4">به فروشگاه سِد خوش آمدید</h1>
    <p class="mb-8">جدیدترین محصولات</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        v-for="item in products.items"
        :key="item.id"
        :product="item"
        @add="addToCart"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from '#imports'
import ProductCard from '~/components/ProductCard.vue'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const products = useProductsStore()
const cart = useCartStore()

onMounted(() => {
  products.fetchList({ page: 1, limit: 6 })
})

function addToCart(product: any) {
  cart.add({ productId: product.id, qty: 1, price_snapshot: product.price.toString() })
}
</script>
