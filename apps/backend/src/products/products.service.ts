import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '../common/prisma.service.js';
import {
  CreateProductDto,
  ProductListQueryDto,
  UpdateProductDto,
} from './products.dto.js';

// ---- Infer types from the real Prisma delegate; no reliance on model-name exports ----
type ProductDelegate   = PrismaClient['product'];
type ProductFindMany   = ProductDelegate['findMany'];
type ProductFindUnique = ProductDelegate['findUnique'];

type ProductFindManyArgs = NonNullable<Parameters<ProductFindMany>[0]>;
type ProductWhere        = NonNullable<ProductFindManyArgs['where']>;
type ProductOrderBy      = NonNullable<ProductFindManyArgs['orderBy']>;

type ProductList   = Awaited<ReturnType<ProductFindMany>>;
type ProductRecord = Awaited<ReturnType<ProductFindUnique>>;
type ProductItem   = ProductList[number]; // one item shape

type ListResult = {
  items: Array<ProductItem & { minPrice?: number; maxPrice?: number }>;
  total: number;
  page: number;
  limit: number;
};

// ---- helpers to remove implicit-any in callbacks ----
type PriceVal     = number | null | undefined;
type WithMinPrice = { minPrice?: PriceVal };
type WithPrice    = { price?: PriceVal };

const cmpNumberNullsLast = (a: PriceVal, b: PriceVal) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return (a as number) - (b as number);
};

const minPriceFrom = (variants: WithPrice[]): number | null => {
  const values = variants
    .map((v: WithPrice) => v.price ?? null)
    .filter((v: number | null): v is number => v != null);
  return values.length ? Math.min(...values) : null;
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private async generateSlug(base: string, excludeId?: string) {
    let slug = slugify(base);
    let i = 1;
    while (
      await this.prisma.product.findFirst({
        where: { slug, NOT: excludeId ? { id: excludeId } : undefined },
      })
    ) {
      i += 1;
      slug = `${slugify(base)}-${i}`;
    }
    return slug;
  }

  private parseSort(sort?: string) {
    const orderBy: Array<Record<string, unknown>> = [];
    if (!sort) return [{ createdAt: 'desc' }];
    for (const part of sort
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean)) {
      const [field, dirRaw] = part.split(':');
      const dir = dirRaw === 'desc' ? 'desc' : 'asc';
      if (field === 'createdAt' || field === 'title') {
        orderBy.push({ [field]: dir });
      } else if (field === 'price') {
        orderBy.push({ __price__: dir });
      } else {
        throw new HttpException(
          { code: 'INVALID_SORT', message: `Cannot sort by ${field}` },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return orderBy.length ? orderBy : [{ createdAt: 'desc' }];
  }

  async list(query: ProductListQueryDto): Promise<ListResult> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 100) : 20;
    const where: ProductWhere = { deletedAt: null };
    if (query.published !== undefined) where.published = query.published;
    else where.published = true;
    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
      ];
    }
    if (query.category) {
      where.category = { slug: query.category };
    }
    if (query.minPrice != null || query.maxPrice != null) {
      where.variants = {
        some: {
          deletedAt: null,
          price: {
            gte: query.minPrice ?? undefined,
            lte: query.maxPrice ?? undefined,
          },
        },
      };
    }
    const orderByRaw = this.parseSort(query.sort);
    const hasPrice = orderByRaw.some((o: Record<string, unknown>) => '__price__' in o);
    const prismaOrderBy = orderByRaw.flatMap((o: Record<string, unknown>) =>
      '__price__' in o
        ? [
            { variants: { _count: 'desc' } },
            { variants: { _min: { price: o['__price__'] as 'asc' | 'desc' } } },
          ]
        : [o],
    );

    const include = {
      category: true,
      images: { where: { deletedAt: null }, orderBy: { position: 'asc' } },
      variants: { where: { deletedAt: null } },
    } as const;

    try {
      const [items, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          where,
          orderBy: prismaOrderBy,
          skip: (page - 1) * limit,
          take: limit,
          include,
        }),
        this.prisma.product.count({ where }),
      ]);

      const mapped = items.map((p: ProductItem & { variants: WithPrice[] }) => {
        const minPriceVal = minPriceFrom(p.variants);
        const maxValues = p.variants
          .map((v: WithPrice) => v.price ?? null)
          .filter((v: PriceVal): v is number => v != null);
        const max = maxValues.length ? Math.max(...maxValues) : null;
        return { ...p, minPrice: minPriceVal ?? undefined, maxPrice: max ?? undefined };
      });

      return { items: mapped, total, page, limit };
    } catch (err) {
      if (!hasPrice) throw err;

      const prismaOrderByNoPrice = orderByRaw.filter(
        (o: Record<string, unknown>) => !('__price__' in o),
      );
      const [items, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({ where, orderBy: prismaOrderByNoPrice, include }),
        this.prisma.product.count({ where }),
      ]);

      const mapped = items.map((p: ProductItem & { variants: WithPrice[] }) => {
        const minPriceVal = minPriceFrom(p.variants);
        const maxValues = p.variants
          .map((v: WithPrice) => v.price ?? null)
          .filter((v: PriceVal): v is number => v != null);
        const max = maxValues.length ? Math.max(...maxValues) : null;
        return { ...p, minPrice: minPriceVal ?? undefined, maxPrice: max ?? undefined };
      });

      const dir =
        orderByRaw.find((o: Record<string, unknown>) => '__price__' in o)?.['__price__'] ===
        'desc'
          ? 'desc'
          : 'asc';
      mapped.sort((a: WithMinPrice, b: WithMinPrice) =>
        dir === 'asc'
          ? cmpNumberNullsLast(a.minPrice, b.minPrice)
          : -cmpNumberNullsLast(a.minPrice, b.minPrice),
      );

      const start = (page - 1) * limit;
      const paged = mapped.slice(start, start + limit);
      return { items: paged, total, page, limit };
    }
  }

  async detail(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: {
        category: true,
        images: { where: { deletedAt: null }, orderBy: { position: 'asc' } },
        variants: { where: { deletedAt: null } },
      },
    });
    if (!product)
      throw new HttpException({ code: 'NOT_FOUND', message: 'Product not found' }, HttpStatus.NOT_FOUND);
    const minPriceVal = minPriceFrom(product.variants as WithPrice[]);
    const maxValues = product.variants
      .map((v: WithPrice) => v.price ?? null)
      .filter((v: PriceVal): v is number => v != null);
    const maxPriceVal = maxValues.length ? Math.max(...maxValues) : null;
    return {
      ...product,
      minPrice: minPriceVal ?? undefined,
      maxPrice: maxPriceVal ?? undefined,
    };
  }

  async create(dto: CreateProductDto) {
    const slug = await this.generateSlug(dto.slug ?? dto.title);
    return this.prisma.product.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        published: dto.published ?? true,
        categoryId: dto.categoryId ?? null,
        variants: dto.variants ? { create: dto.variants } : undefined,
        images: dto.images ? { create: dto.images } : undefined,
      },
      include: { variants: true, images: true, category: true },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const data: any = { ...dto };
    if (dto.slug || dto.title) {
      const base = dto.slug ?? dto.title!;
      data.slug = await this.generateSlug(base, id);
    }
    return this.prisma.product.update({
      where: { id },
      data,
      include: { variants: true, images: true, category: true },
    });
  }

  async remove(id: string) {
    return this.prisma.product.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
