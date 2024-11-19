import { defineConfig } from 'drizzle-kit'

if(!process.env.DATABASE_URL){
    throw new Error("No database url provided")
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    out: "./src/db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict:true
})