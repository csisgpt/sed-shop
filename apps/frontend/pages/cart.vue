<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">سبد خرید</h1>
    <div v-if="cart.items.length === 0">سبد خرید خالی است</div>
    <div v-else class="space-y-4">
      <div v-for="item in cart.items" :key="item.productId" class="flex items-center gap-4">
        <span class="flex-1">{{ products.byId(item.productId)?.title }}</span>
        <Form :validation-schema="qtySchema" @submit="(values) => update(item.productId, values.qty)">
          <Field name="qty" :model-value="item.qty" v-slot="{ field, errorMessage }">
            <input v-bind="field" type="number" min="1" class="border p-1 w-16 text-center" />
            <span class="text-red-500 text-xs">{{ errorMessage }}</span>
          </Field>
        </Form>
        <span>{{ item.price_snapshot }}</span>
        <button class="text-red-500" @click="remove(item.productId)">حذف</button>
      </div>
      <div class="text-end font-bold">مجموع: {{ cart.total() }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useCartStore } from '~/stores/cart'
import { useProductsStore } from '~/stores/products'

const cart = useCartStore()
const products = useProductsStore()

const qtySchema = toTypedSchema(z.object({ qty: z.number().int().positive() }))

function update(id: string, qty: number) {
  cart.update(id, qty)
}

function remove(id: string) {
  cart.remove(id)
}
</script>
