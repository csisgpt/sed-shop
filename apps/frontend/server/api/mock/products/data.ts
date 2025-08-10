export interface MockProduct {
  id: string
  slug: string
  title: string
  price: number
  image: string
  description: string
  variants?: { id: string; title: string }[]
}

export const products: MockProduct[] = [
  {
    id: '1',
    slug: 'kafsh-mardane',
    title: 'کفش مردانه',
    price: 2500000,
    image: 'https://picsum.photos/seed/shoe/400/400',
    description: 'کفش راحت برای استفاده روزمره',
    variants: [
      { id: 'v1', title: 'سایز 42' },
      { id: 'v2', title: 'سایز 43' }
    ]
  },
  {
    id: '2',
    slug: 'pirahan',
    title: 'پیراهن نخی',
    price: 850000,
    image: 'https://picsum.photos/seed/shirt/400/400',
    description: 'پیراهن خنک تابستانی'
  },
  {
    id: '3',
    slug: 'ketab',
    title: 'کتاب فارسی',
    price: 120000,
    image: 'https://picsum.photos/seed/book/400/400',
    description: 'کتاب آموزشی'
  }
]
