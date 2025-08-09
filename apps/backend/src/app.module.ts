import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HealthController } from './health/health.controller';
import { MetricsController } from './metrics/metrics.controller';
import { CorrelationIdMiddleware } from './common/correlation-id.middleware';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [HealthController, MetricsController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
