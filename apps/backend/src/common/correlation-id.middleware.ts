import { Injectable, NestMiddleware } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers['x-request-id'];
    const correlationId = Array.isArray(header) ? header[0] : header;
    const id = correlationId ?? randomUUID();
    req.id = id;
    res.setHeader('x-request-id', id);
    this.logger.assign({ correlationId: id });
    next();
  }
}
