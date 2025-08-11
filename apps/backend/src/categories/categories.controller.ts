import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto.js';

@ApiTags('categories')
@Controller({ path: 'v1/categories' })
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List categories' })
  list() {
    return this.service.list();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category by slug' })
  detail(@Param('slug') slug: string) {
    return this.service.detail(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category (soft)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
