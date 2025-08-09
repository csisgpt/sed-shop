import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = 'x-correlation-id';
  let id = req.header(header);
  if (!id) {
    id = randomUUID();
    req.headers[header] = id;
  }
  res.setHeader(header, id);
  next();
}
