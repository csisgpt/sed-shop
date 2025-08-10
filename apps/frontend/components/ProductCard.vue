<script setup lang="ts">
import type { Product } from '@sed-shop/shared-schemas'

const { product } = defineProps<{ product: Product }>()
const { format } = useCurrency()
</script>

<template>
  <NuxtLink :to="`/products/${product.slug}`" class="block border rounded p-4 hover:shadow">
    <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.title" class="mb-2" />
    <h3 class="font-bold mb-2">{{ product.title }}</h3>
    <p>{{ format(product.priceRial) }}</p>
  </NuxtLink>
</template>
