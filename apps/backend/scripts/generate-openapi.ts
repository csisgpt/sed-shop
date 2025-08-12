import 'reflect-metadata';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function run() {
  // Dynamically import EVERY non-Node module so any resolve error is catchable & logged
  const [{ NestFactory }, { SwaggerModule, DocumentBuilder }, plat, expressMod] =
    await Promise.all([
      import('@nestjs/core'),
      import('@nestjs/swagger'),
      import('@nestjs/platform-express'),
      import('express'),
    ]);

  // Normalize default export for express (CJS/ESM interop)
  const express = (expressMod as any).default ?? (expressMod as any);

  // Import AppModule dynamically too (catchable)
  const { AppModule } = await import('../src/app.module.js');

  const server = express();
  const { ExpressAdapter } = plat as any;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: false,
  });

  // Mirror main.ts prefix so routes match /api/*
  app.setGlobalPrefix('api');

  // Do NOT call app.init() to avoid DB connects via Prisma onModuleInit; decorators are enough.

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
  try {
    console.error('[openapi:gen] Error object:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } catch {}
  process.exit(1);
});
