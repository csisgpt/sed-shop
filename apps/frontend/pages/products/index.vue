<template>
  <div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="p in data?.items"
        :key="p.id"
        class="border rounded p-4 flex flex-col"
      >
        <img
          v-if="p.images?.[0]"
          :src="p.images[0].url"
          :alt="p.title"
          class="w-full h-48 object-cover"
        />
        <h3 class="mt-2 text-lg">
          <NuxtLink :to="`/products/${p.slug}`">{{ p.title }}</NuxtLink>
        </h3>
        <p class="text-gray-600 mt-auto">
          {{ formatPrice(p.minPrice) }}
          <span v-if="p.maxPrice && p.maxPrice !== p.minPrice"
            >- {{ formatPrice(p.maxPrice) }}</span
          >
        </p>
      </div>
    </div>
    <div class="mt-4 flex gap-2">
      <NuxtLink
        v-if="page > 1"
        :to="{ query: { ...route.query, page: page - 1 } }"
        class="px-2 py-1 border rounded"
        >Prev</NuxtLink
      >
      <NuxtLink
        v-if="data && page * limit < data.total"
        :to="{ query: { ...route.query, page: page + 1 } }"
        class="px-2 py-1 border rounded"
        >Next</NuxtLink
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useAsyncData, computed } from '#imports'
import { useApiClient } from '~/composables/useApiClient'
import { useCurrency } from '~/composables/useCurrency'

const route = useRoute()
const api = useApiClient()
const query = {
  q: route.query.q as string | undefined,
  category: route.query.category as string | undefined,
  sort: route.query.sort as string | undefined,
  page: route.query.page ? Number(route.query.page) : undefined,
  limit: route.query.limit ? Number(route.query.limit) : undefined,
}
const { data } = await useAsyncData('products', () =>
  api.GET('/v1/products', { params: { query } }).then((r) => r.data)
)
const page = computed(() => Number(route.query.page ?? 1))
const limit = computed(() => Number(route.query.limit ?? 20))
const formatPrice = (p?: number) => (p != null ? useCurrency(p) : '')
</script>
