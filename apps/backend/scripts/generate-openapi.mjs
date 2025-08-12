import 'reflect-metadata';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function run() {
  // Dynamically import ALL non-Node modules so any resolution error is caught & logged
  const [{ NestFactory }, { SwaggerModule, DocumentBuilder }, platform, expressMod] =
    await Promise.all([
      import('@nestjs/core'),
      import('@nestjs/swagger'),
      import('@nestjs/platform-express'),
      import('express'),
    ]);

  const express = expressMod.default ?? expressMod;         // CJS/ESM interop
  const { ExpressAdapter } = platform;

  // Import compiled AppModule from dist (requires building backend first)
  const { AppModule } = await import('../dist/src/app.module.js');

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
  });

  // Mirror main.ts so routes match /api/*
  app.setGlobalPrefix('api');

  // Do NOT call app.init(); avoid DB connects via Prisma onModuleInit — decorators are enough.

  const cfg = new DocumentBuilder()
    .setTitle('sed-shop API')
    .setDescription('OpenAPI for sed-shop')
    .setVersion('1')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .build();

  const doc = SwaggerModule.createDocument(app, cfg);

  // Write relative to this file (cwd-agnostic)
  const here = dirname(fileURLToPath(import.meta.url));      // .../apps/backend/scripts
  const out = join(here, '..', 'openapi.json');              // .../apps/backend/openapi.json
  writeFileSync(out, JSON.stringify(doc, null, 2), 'utf-8');

  await app.close();
  console.log(`[openapi:gen] Wrote ${out}`);
}

run().catch((err) => {
  console.error('[openapi:gen] Failed:\n', err?.stack || err);
  try { console.error('[openapi:gen] Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2)); } catch {}
  process.exit(1);
});
