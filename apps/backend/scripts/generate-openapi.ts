/// apps/backend/scripts/generate-openapi.ts
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

async function run() {
  // 1) Import AppModule dynamically so import-time errors are catchable
  const { AppModule } = await import('../src/app.module.js');

  // 2) Use Express adapter (safer across envs)
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
  });

  // mirror main.ts prefix so routes match /api/*
  app.setGlobalPrefix('api');

  // NOTE: Do NOT call app.init() to avoid triggering DB connections via Prisma onModuleInit.
  // OpenAPI generation only needs decorators metadata which is available without init.

  const cfg = new DocumentBuilder()
    .setTitle('sed-shop API')
    .setDescription('OpenAPI for sed-shop')
    .setVersion('1')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .build();

  const doc = SwaggerModule.createDocument(app, cfg);
  const out = join(process.cwd(), 'apps', 'backend', 'openapi.json');
  writeFileSync(out, JSON.stringify(doc, null, 2), 'utf-8');

  await app.close();
  console.log(`[openapi:gen] Wrote ${out}`);
}

run().catch((err) => {
  // Print maximum detail so CI shows the root cause if anything fails
  console.error('[openapi:gen] Failed:\n', err?.stack || err);
  try {
    console.error('[openapi:gen] Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } catch {}
  process.exit(1);
});
