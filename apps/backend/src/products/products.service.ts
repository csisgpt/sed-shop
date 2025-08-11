import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../common/prisma.service.js';
import {
  CreateProductDto,
  ProductListQueryDto,
  UpdateProductDto,
} from './products.dto.js';

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

  private parseSort(sort?: string): Prisma.ProductOrderByWithRelationInput[] {
    if (!sort) return [{ createdAt: 'desc' }];
    const parts = sort.split(',');
    const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
    for (const p of parts) {
      const [field, dir] = p.split(':');
      if (!['createdAt', 'title'].includes(field)) {
        throw new HttpException(
          { code: 'INVALID_SORT', message: `Cannot sort by ${field}` },
          HttpStatus.BAD_REQUEST,
        );
      }
      orderBy.push({ [field]: dir === 'desc' ? 'desc' : 'asc' } as any);
    }
    return orderBy;
  }

  async list(query: ProductListQueryDto) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 100) : 20;
    const where: Prisma.ProductWhereInput = { deletedAt: null };
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
    const orderBy = this.parseSort(query.sort);
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          images: { where: { deletedAt: null }, orderBy: { position: 'asc' } },
          variants: { where: { deletedAt: null } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const mapped = items.map((p) => {
      const prices = p.variants.map((v) => v.price);
      const minPrice = prices.length ? Math.min(...prices) : undefined;
      const maxPrice = prices.length ? Math.max(...prices) : undefined;
      return { ...p, minPrice, maxPrice };
    });

    return { items: mapped, total, page, limit };
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
    const prices = product.variants.map((v) => v.price);
    const minPrice = prices.length ? Math.min(...prices) : undefined;
    const maxPrice = prices.length ? Math.max(...prices) : undefined;
    return { ...product, minPrice, maxPrice };
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
