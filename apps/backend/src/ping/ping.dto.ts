import { ApiProperty } from '@nestjs/swagger';

export class PingResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: 'fa-IR' })
  locale!: string;

  @ApiProperty({ example: 'v1' })
  version!: string;
}

