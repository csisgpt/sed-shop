import { defineEventHandler, getQuery } from 'h3'
import { products } from './data'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page || 1)
  const limit = Number(query.limit || 10)
  const start = (page - 1) * limit
  const items = products.slice(start, start + limit)
  return {
    items,
    total: products.length,
    page,
    limit
  }
})
