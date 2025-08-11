import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  slug?: string;

  @ApiPropertyOptional()
  parentId?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  slug?: string;

  @ApiPropertyOptional()
  parentId?: string;
}
