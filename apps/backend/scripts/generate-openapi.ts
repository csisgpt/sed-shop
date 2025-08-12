// --- apps/backend/scripts/generate-openapi.ts ---
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
// ESM local import requires .js suffix
import { AppModule } from '../src/app.module.js';

async function run() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
  });

  // mirror main.ts prefix so paths are correct
  app.setGlobalPrefix('api');

  // initialize providers/modules so decorator metadata is ready
  await app.init();

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
  console.log(`[openapi:gen] Wrote ${out}`);
}

run().catch((err) => {
  console.error('[openapi:gen] Failed:\n', err?.stack || err);
  try {
    console.error('[openapi:gen] Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } catch {}
  process.exit(1);
});
// --- end file ---
