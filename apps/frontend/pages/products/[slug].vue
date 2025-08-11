<template>
  <article class="prose max-w-none">
    <h1>{{ product?.title }}</h1>
    <img v-if="product?.images?.[0]" :src="product.images[0].url" :alt="product.title" class="w-full h-64 object-cover">
    <p v-if="product?.variants?.[0]">{{ formatPrice(product.variants[0].price) }}</p>
  </article>
</template>
<script setup lang="ts">
import { useRoute } from '#imports'
import { useProductsStore, type Product } from '~/stores/products'
import { useCurrency } from '~/composables/useCurrency'
const route = useRoute()
const store = useProductsStore()
const formatPrice = (p?: number | string) => (p != null ? useCurrency(p) : '')
const slug = String(route.params.slug)
const product = await store.fetchBySlug(slug) as Product
</script>
