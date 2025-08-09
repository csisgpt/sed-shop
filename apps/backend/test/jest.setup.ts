import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

let pg: StartedPostgreSqlContainer;

beforeAll(async () => {
  pg = await new PostgreSqlContainer('postgres:16-alpine').start();
  process.env.DATABASE_URL = pg.getConnectionUri();
}, 30000);

afterAll(async () => {
  await pg.stop();
});
