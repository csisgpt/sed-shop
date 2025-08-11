import { Test } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/common/prisma.service.js';

describe('Products', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    await app.init();

    prisma = app.get(PrismaService);
    // minimal seed if not exists
    await prisma.category.upsert({
      where: { slug: 'test-cat' },
      update: {},
      create: { name: 'Test Cat', slug: 'test-cat' },
    });
    await prisma.product.upsert({
      where: { slug: 'test-prod' },
      update: {},
      create: {
        title: 'Test Prod',
        slug: 'test-prod',
        category: { connect: { slug: 'test-cat' } },
        variants: { create: [{ sku: 'TP-1', price: 1000, stock: 1 }] },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/products returns list', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    expect(res.body.total).toBeGreaterThan(0);
    expect(res.body.items[0].slug).toBeDefined();
  });

  it('GET /api/v1/products/:slug returns detail', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/products/test-prod').expect(200);
    expect(Array.isArray(res.body.variants)).toBe(true);
  });
});
