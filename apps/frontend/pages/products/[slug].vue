<template>
  <article class="prose max-w-none">
    <h1>{{ product?.title }}</h1>
    <img v-if="product?.images?.[0]" :src="product.images[0].url" :alt="product.title" class="w-full h-64 object-cover">
    <p v-if="product?.variants?.[0]">{{ formatPrice(product.variants[0].price) }}</p>
  </article>
</template>
<script setup lang="ts">
import { useRoute, useRuntimeConfig, useFetch } from '#imports'
import type { Product } from '@sed-shop/shared-schemas'
import { useCurrency } from '~/composables/useCurrency'

const route = useRoute()
const {
  public: { apiBase }
} = useRuntimeConfig()

const { data: product } = await useFetch<Product>(
  `${apiBase}/v1/products/${route.params.slug}`
)

const formatPrice = (p?: number | string) =>
  p != null ? useCurrency(Number(p)) : ''
</script>
