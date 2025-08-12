import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function run() {
  // dynamic import so any import-time error is caught and logged
  const { AppModule } = await import('../src/app.module.js');

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
  });

  // mirror main.ts prefix so routes match /api/*
  app.setGlobalPrefix('api');

  // Do NOT call app.init() to avoid DB connects in onModuleInit; decorators metadata is enough.

  const cfg = new DocumentBuilder()
    .setTitle('sed-shop API')
    .setDescription('OpenAPI for sed-shop')
    .setVersion('1')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .build();

  const doc = SwaggerModule.createDocument(app, cfg);

  // write relative to this file (cwd-agnostic)
  const here = dirname(fileURLToPath(import.meta.url));        // .../apps/backend/scripts
  const out = join(here, '..', 'openapi.json');                // .../apps/backend/openapi.json
  writeFileSync(out, JSON.stringify(doc, null, 2), 'utf-8');

  await app.close();
  console.log(`[openapi:gen] Wrote ${out}`);
}

run().catch((err) => {
  console.error('[openapi:gen] Failed:\n', err?.stack || err);
  try {
    console.error('[openapi:gen] Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } catch {}
  process.exit(1);
});
