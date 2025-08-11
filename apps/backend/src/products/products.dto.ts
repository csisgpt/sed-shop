import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductListQueryDto {
  @ApiPropertyOptional()
  q?: string;

  @ApiPropertyOptional({ description: 'Category slug' })
  category?: string;

  @ApiPropertyOptional()
  minPrice?: number;

  @ApiPropertyOptional()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'comma separated e.g. createdAt:desc,title:asc' })
  sort?: string;

  @ApiPropertyOptional({ default: 1 })
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  limit?: number;

  @ApiPropertyOptional({ default: true })
  published?: boolean;
}

export class ProductVariantInputDto {
  @ApiPropertyOptional()
  sku?: string;

  @ApiProperty()
  price!: number;

  @ApiPropertyOptional()
  compareAtPrice?: number;

  @ApiPropertyOptional()
  stock?: number;

  @ApiPropertyOptional()
  attrs?: Record<string, any>;
}

export class ProductImageInputDto {
  @ApiProperty()
  url!: string;

  @ApiPropertyOptional()
  alt?: string;

  @ApiPropertyOptional()
  position?: number;
}

export class CreateProductDto {
  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  slug?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  published?: boolean;

  @ApiPropertyOptional()
  categoryId?: string;

  @ApiPropertyOptional({ type: () => [ProductVariantInputDto] })
  variants?: ProductVariantInputDto[];

  @ApiPropertyOptional({ type: () => [ProductImageInputDto] })
  images?: ProductImageInputDto[];
}

export class UpdateProductDto extends CreateProductDto {}
