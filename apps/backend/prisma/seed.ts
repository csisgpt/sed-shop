import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function upsertCategory(data: { name: string; slug: string; parentSlug?: string }) {
  const parent = data.parentSlug
    ? await prisma.category.findUnique({ where: { slug: data.parentSlug } })
    : null;
  return prisma.category.upsert({
    where: { slug: data.slug },
    update: { name: data.name, parentId: parent?.id },
    create: { name: data.name, slug: data.slug, parentId: parent?.id },
  });
}

async function createProduct(data: {
  title: string;
  slug: string;
  categorySlug?: string;
  description?: string;
  variants: { sku: string; price: number; stock: number; compareAtPrice?: number }[];
  images: { url: string; alt?: string; position?: number }[];
}) {
  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) return existing;
  const category = data.categorySlug
    ? await prisma.category.findUnique({ where: { slug: data.categorySlug } })
    : null;
  return prisma.product.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      categoryId: category?.id,
      published: true,
      variants: { create: data.variants },
      images: { create: data.images },
    },
  });
}

async function main() {
  // categories
  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Laptops', slug: 'laptops', parentSlug: 'electronics' },
    { name: 'Phones', slug: 'phones', parentSlug: 'electronics' },
    { name: 'Home', slug: 'home' },
    { name: 'Kitchen', slug: 'kitchen', parentSlug: 'home' },
  ];
  for (const c of categories) {
    await upsertCategory(c);
  }

  const products = [
    {
      title: 'Laptop Pro',
      slug: 'laptop-pro',
      categorySlug: 'laptops',
      variants: [
        { sku: 'LTP-BASE', price: 70000000, stock: 5 },
        { sku: 'LTP-UP', price: 90000000, stock: 2 },
      ],
      images: [{ url: 'https://picsum.photos/seed/laptop-pro/400/300', alt: 'Laptop Pro' }],
    },
    {
      title: 'Laptop Air',
      slug: 'laptop-air',
      categorySlug: 'laptops',
      variants: [
        { sku: 'LTA-1', price: 60000000, stock: 7 },
      ],
      images: [{ url: 'https://picsum.photos/seed/laptop-air/400/300', alt: 'Laptop Air' }],
    },
    {
      title: 'Smartphone X',
      slug: 'smartphone-x',
      categorySlug: 'phones',
      variants: [
        { sku: 'SPX-64', price: 30000000, stock: 20 },
        { sku: 'SPX-128', price: 35000000, stock: 10 },
      ],
      images: [{ url: 'https://picsum.photos/seed/smartphone-x/400/300', alt: 'Smartphone X' }],
    },
    {
      title: 'Smartphone Mini',
      slug: 'smartphone-mini',
      categorySlug: 'phones',
      variants: [{ sku: 'SPM-1', price: 25000000, stock: 15 }],
      images: [{ url: 'https://picsum.photos/seed/smartphone-mini/400/300', alt: 'Smartphone Mini' }],
    },
    {
      title: 'Coffee Maker',
      slug: 'coffee-maker',
      categorySlug: 'kitchen',
      variants: [{ sku: 'CM-1', price: 5000000, stock: 15 }],
      images: [{ url: 'https://picsum.photos/seed/coffee-maker/400/300', alt: 'Coffee Maker' }],
    },
    {
      title: 'Blender Basic',
      slug: 'blender-basic',
      categorySlug: 'kitchen',
      variants: [{ sku: 'BLD-1', price: 4000000, stock: 15 }],
      images: [{ url: 'https://picsum.photos/seed/blender-basic/400/300', alt: 'Blender Basic' }],
    },
    {
      title: 'Vacuum Cleaner',
      slug: 'vacuum-cleaner',
      categorySlug: 'home',
      variants: [{ sku: 'VC-1', price: 8000000, stock: 8 }],
      images: [{ url: 'https://picsum.photos/seed/vacuum-cleaner/400/300', alt: 'Vacuum Cleaner' }],
    },
    {
      title: 'Microwave Oven',
      slug: 'microwave-oven',
      categorySlug: 'kitchen',
      variants: [{ sku: 'MW-1', price: 10000000, stock: 6 }],
      images: [{ url: 'https://picsum.photos/seed/microwave-oven/400/300', alt: 'Microwave Oven' }],
    },
  ];

  for (const p of products) {
    await createProduct(p);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
