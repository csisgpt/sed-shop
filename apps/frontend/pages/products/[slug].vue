<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const store = useProductsStore()
const product = await store.fetchProduct(route.params.slug as string)
const { format } = useCurrency()
</script>

<template>
  <div v-if="product">
    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
    <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.title" class="mb-4" />
    <p>{{ format(product.priceRial) }}</p>
  </div>
</template>
