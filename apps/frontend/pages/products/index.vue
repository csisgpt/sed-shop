<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">محصولات</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        v-for="item in products.items"
        :key="item.id"
        :product="item"
        @add="addToCart"
      />
    </div>
    <div class="mt-4 flex justify-center gap-2">
      <button @click="prevPage" :disabled="page === 1">قبلی</button>
      <button @click="nextPage">بعدی</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from '#imports'
import ProductCard from '~/components/ProductCard.vue'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const products = useProductsStore()
const cart = useCartStore()
const page = ref(1)

watchEffect(() => {
  products.fetchList({ page: page.value, limit: 6 })
})

function nextPage() {
  page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

function addToCart(product: any) {
  cart.add({ productId: product.id, qty: 1, price_snapshot: product.price.toString() })
}
</script>
