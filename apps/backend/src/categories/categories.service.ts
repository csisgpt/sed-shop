import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto.js';

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');
}

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.category.findMany({ where: { deletedAt: null } });
  }

  async detail(slug: string) {
    const cat = await this.prisma.category.findFirst({
      where: { slug, deletedAt: null },
      include: { _count: { select: { children: true } } },
    });
    if (!cat) throw new HttpException({ code: 'NOT_FOUND', message: 'Category not found' }, HttpStatus.NOT_FOUND);
    return { ...cat, childrenCount: cat._count.children };
  }

  private async generateSlug(base: string, excludeId?: string) {
    let slug = slugify(base);
    let i = 1;
    while (
      await this.prisma.category.findFirst({
        where: { slug, NOT: excludeId ? { id: excludeId } : undefined },
      })
    ) {
      i += 1;
      slug = `${slugify(base)}-${i}`;
    }
    return slug;
  }

  async create(dto: CreateCategoryDto) {
    const slug = await this.generateSlug(dto.slug ?? dto.name);
    return this.prisma.category.create({
      data: { name: dto.name, slug, parentId: dto.parentId },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const data: any = { ...dto };
    if (dto.slug || dto.name) {
      const base = dto.slug ?? dto.name!;
      data.slug = await this.generateSlug(base, id);
    }
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
