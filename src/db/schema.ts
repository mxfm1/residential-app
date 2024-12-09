import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, uuid} from 'drizzle-orm/pg-core'

const accountTypeEnum = pgEnum('accountTypeEnum',["email","google"])

export const account = pgTable('accounts',{
    id: uuid('id').defaultRandom().primaryKey(),
    userId: integer('userId').references(() => user.id,{onDelete:"cascade"}),
    accountType: accountTypeEnum('accountTypeEnum').notNull(),
    googleId: text('googleId').unique(),
    password: text('password'),
    salt: text('salt')    
})

export const user = pgTable('users',{
    id: serial('id').primaryKey(),
    email: text('email').unique(),
    emailVerified: boolean().default(false),
    emailDateVerified: timestamp('emailDateVerified',{mode:"date"})
})

export const profile = pgTable('profiles',{
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    lastName: text('lastName')
})
