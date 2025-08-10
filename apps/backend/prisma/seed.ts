import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // minimal seed: one category, one product, one variant, one image
  const category = await prisma.category.upsert({
    where: { slug: 'default' },
    update: {},
    create: { name: 'Default', slug: 'default' },
  });

  const product = await prisma.product.create({
    data: {
      title: 'Sample Product',
      slug: 'sample-product',
      categoryId: category.id,
      published: true,
      variants: {
        create: [
          {
            sku: 'SP-001',
            title: 'Default',
            // IRR as string (Decimal(12,0) in DB)
            price: '250000',
            stock: 10
          }
        ]
      },
      images: {
        create: [
          {
            url: 'https://example.com/sample.jpg',
            alt: 'Sample',
            position: 0
          }
        ]
      }
    }
  });

  console.log('Seeded:', { category: category.slug, product: product.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
