import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

async function run() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('sed-shop API')
    .setDescription('OpenAPI for sed-shop')
    .setVersion('1')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  const out = join(process.cwd(), 'apps', 'backend', 'openapi.json');
  writeFileSync(out, JSON.stringify(doc, null, 2), 'utf-8');
  await app.close();
  console.log(`OpenAPI written to ${out}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

