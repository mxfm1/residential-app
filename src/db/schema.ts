import { boolean, pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core'

export const user = pgTable('users',{
    id: serial('id').primaryKey(),
    email: text('email').unique(),
    emailVerified: boolean().default(false),
    emailDateVerified: timestamp('emailDateVerified',{mode:"date"})
})
