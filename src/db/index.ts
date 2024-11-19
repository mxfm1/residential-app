import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

const databaseURL = process.env.DATABASE_URL
console.log("DATAVBASE URL",databaseURL)
// const devDatabaseUrl = process.env.DEV_DATABASE_URL

if (process.env.NODE_ENV === "production") {
  pg = postgres(databaseURL as string);
  database = drizzle(pg, { schema });
} else {
  if (!(global as any).database!) {
    pg = postgres(databaseURL as string);
    (global as any).database = drizzle(pg, { schema });
  }
  database = (global as any).database;
}

export { database, pg };