import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HealthController } from './health/health.controller.js';
import { MetricsController } from './metrics/metrics.controller.js';
import { CorrelationIdMiddleware } from './common/correlation-id.middleware.js';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [HealthController, MetricsController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
