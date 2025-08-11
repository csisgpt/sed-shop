import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HealthController } from './health/health.controller.js';
import { MetricsController } from './metrics/metrics.controller.js';
import { PingController } from './ping/ping.controller.js';
import { CorrelationIdMiddleware } from './common/correlation-id.middleware.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [LoggerModule.forRoot(), ProductsModule, CategoriesModule],
  controllers: [HealthController, MetricsController, PingController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
