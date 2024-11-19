import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { database,pg } from '.';


async function main() {
    await migrate(database, { migrationsFolder: "./src/db/migrations" });
    await pg.end();
  }
  
  main();