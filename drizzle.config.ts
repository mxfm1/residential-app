import { defineConfig } from "drizzle-kit";

if(!process.env.DATABASE_URL) throw new Error("You must provide an database url in order to load drizzle configurations")

export default defineConfig({
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    verbose:true,
    strict:true
})