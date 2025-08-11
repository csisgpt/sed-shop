import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import {
  CreateProductDto,
  ProductListQueryDto,
  UpdateProductDto,
} from './products.dto.js';

@ApiTags('products')
@Controller({ path: 'v1/products' })
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  list(@Query() query: ProductListQueryDto) {
    return this.service.list(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  detail(@Param('slug') slug: string) {
    return this.service.detail(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product (soft)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
