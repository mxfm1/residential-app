import dotenv from 'dotenv'
import { drizzle, PostgresJsDatabase} from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'

dotenv.config()
let pg:ReturnType<typeof postgres>
let database:PostgresJsDatabase<typeof schema>

const databaseURL = process.env.DATABASE_URL
console.log(databaseURL)
console.log(process.env.NODE_ENV)
if(!databaseURL) throw new Error('There must be provided a database url')

if(process.env.NODE_ENV === 'production'){
    pg = postgres(databaseURL)
    database = drizzle(pg,{schema})
}else{
    if (!(global as any).database!) {
        pg = postgres(databaseURL);
        (global as any).database = drizzle(pg, { schema });
      }
      database = (global as any).database;
}

export { pg,database}
