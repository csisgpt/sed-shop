import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) =>
          (req.headers['x-correlation-id'] as string) ?? randomUUID(),
      },
    }),
    PrismaModule,
    HealthModule,
    MetricsModule,
  ],
})
export class AppModule {}
