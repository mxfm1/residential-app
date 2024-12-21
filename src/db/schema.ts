import { boolean, index, integer, pgEnum, pgTable, serial, text, timestamp, uuid} from 'drizzle-orm/pg-core'

export const accountTypeEnum = pgEnum('accountTypeEnum',["email","google"])

export const account = pgTable('accounts',{
    id: uuid('id').defaultRandom().primaryKey(),
    userId: integer('userId').references(() => user.id,{onDelete:"cascade"}),
    accountType: accountTypeEnum('accountTypeEnum').notNull(),
    googleId: text('googleId').unique(),
    password: text('password'),
    salt: text('salt')
},(table) => ({
    userIdAccountTypeIdX: index('accountTypeUserIdx').on(
        table.userId,
        table.accountType
    )
}))

export const user = pgTable('users',{
    id: serial('id').primaryKey(),
    email: text('email').unique(),
    emailVerified: boolean().default(false),
    emailDateVerified: timestamp('emailDateVerified',{mode:"date"})
})

export const profile = pgTable('profiles',{
    id: uuid('id').defaultRandom().primaryKey(),
    userId: integer('userId').references(() => user.id,{onDelete:"cascade"}),
    name: text('name').notNull(),
    lastName: text('lastName')
})

export const sessions = pgTable('sessions',{
    id: text('id').primaryKey(),
    userId: integer('userId').references(() => user.id),
    expired_at: timestamp('expired_At',{mode:"date",withTimezone:true}).notNull()
},(table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId)
}))


export type Session = typeof sessions.$inferSelect;
export type User = typeof user.$inferSelect