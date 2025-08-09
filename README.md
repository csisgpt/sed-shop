# sed-shop

Monorepo for the sed shop online store using PNPM Workspaces and Turborepo.

## Setup

```sh
pnpm install
```

## Scripts

- `pnpm dev` - run all apps in development mode
- `pnpm build` - build all apps and packages
- `pnpm lint` - lint source files
- `pnpm typecheck` - run TypeScript type checking
- `pnpm test` - run test suites
- `pnpm format` - format files with Prettier

## Backend

```sh
pnpm dev --filter @sed-shop/backend # start backend in watch mode
```

Backend runs on [http://localhost:3000](http://localhost:3000) with Swagger docs at `/api/docs` and health checks at `/healthz`.
