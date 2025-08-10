import { products } from './data'

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event)
  const product = products.find((p) => p.slug === slug)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  return product
})
