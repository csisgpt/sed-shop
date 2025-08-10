import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

@Controller()
export class MetricsController {
  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  }
}
