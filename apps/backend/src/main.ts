import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { correlationIdMiddleware } from './common/correlation-id.middleware';
import { collectDefaultMetrics } from 'prom-client';

async function bootstrap() {
  collectDefaultMetrics();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(correlationIdMiddleware);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('sed-shop API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
