<template>
  <article class="prose max-w-none">
    <h1>{{ product?.title }}</h1>
    <div class="flex gap-2">
      <img
        v-for="img in product?.images || []"
        :key="img.url"
        :src="img.url"
        :alt="img.alt || product?.title"
        class="w-40 h-40 object-cover"
      />
    </div>
    <p v-if="product?.description">{{ product.description }}</p>
    <ul>
      <li v-for="v in product?.variants || []" :key="v.id">
        {{ v.sku }} - {{ formatPrice(v.price) }} ({{ v.stock }})
      </li>
    </ul>
  </article>
</template>
<script setup lang="ts">
import { useRoute } from '#imports'
import { useApiClient } from '~/composables/useApiClient'
import { useCurrency } from '~/composables/useCurrency'

const route = useRoute()
const api = useApiClient()
const { data: product } = await useAsyncData('product', () =>
  api
    .GET('/api/v1/products/{slug}', {
      params: { path: { slug: route.params.slug as string } },
    })
    .then((r) => r.data)
)
const formatPrice = (p?: number) => (p != null ? useCurrency(p) : '')
</script>
