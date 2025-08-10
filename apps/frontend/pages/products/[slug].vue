<template>
  <section class="p-4" v-if="product">
    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
    <img :src="product.image" :alt="product.title" class="mb-4 rounded" />
    <p class="mb-2">{{ format(product.price) }}</p>
    <button class="bg-blue-600 text-white py-1 px-2 rounded" @click="addToCart">
      افزودن به سبد
    </button>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, useRoute } from '#imports'
import { useProductsStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useCurrency } from '~/composables/useCurrency'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()
const { format } = useCurrency()
const product = ref<any | null>(null)

onMounted(async () => {
  product.value = await products.fetchBySlug(route.params.slug as string)
})

function addToCart() {
  if (product.value) {
    cart.add({ productId: product.value.id, qty: 1, price_snapshot: product.value.price.toString() })
  }
}
</script>
