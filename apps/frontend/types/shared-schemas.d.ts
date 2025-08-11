declare module '@sed-shop/shared-schemas' {
  export interface ProductImage {
    url: string
    alt?: string | null
  }

  export interface ProductVariant {
    price: number | string
    title?: string | null
  }

  export interface Product {
    id: string
    slug: string
    title: string
    images?: ProductImage[]
    variants?: ProductVariant[]
  }
}

