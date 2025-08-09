import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.create({
    data: { name: 'Sample Category', slug: 'sample-category' },
  });

  await prisma.product.create({
    data: {
      title: 'Sample Product',
      slug: 'sample-product',
      categoryId: category.id,
      variants: {
        create: {
          sku: 'SAMPLE-1',
          price: new Prisma.Decimal(100000),
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
