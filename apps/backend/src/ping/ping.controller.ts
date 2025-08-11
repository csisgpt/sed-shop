import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PingResponseDto } from './ping.dto.js';

@ApiTags('system')
@Controller({ path: 'v1/ping' }) // final path: /api/v1/ping
export class PingController {
  @Get()
  @ApiOperation({ summary: 'Ping test endpoint' })
  @ApiOkResponse({ type: PingResponseDto })
  ping(): PingResponseDto {
    return { status: 'ok', locale: 'fa-IR', version: 'v1' };
  }
}

