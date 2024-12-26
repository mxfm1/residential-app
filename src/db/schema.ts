import { boolean, index, integer, pgEnum, pgTable, serial, text, timestamp, uuid} from 'drizzle-orm/pg-core'

export const accountTypeEnum = pgEnum('accountTypeEnum',["email","google"])

export const accounts = pgTable('accounts',{
    id: uuid('id').defaultRandom().primaryKey(),
    userId: integer('userId').references(() => users.id,{onDelete:"cascade"}),
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

export const users = pgTable('users',{
    id: serial('id').primaryKey(),
    email: text('email').unique(),
    emailVerified: boolean().default(false),
    emailDateVerified: timestamp('emailDateVerified',{mode:"date"})
})

export const profiles = pgTable('profiles',{
    id: uuid('id').defaultRandom().primaryKey(),
    userId: integer('userId').
        notNull().
        references(() => users.id,{onDelete:"cascade"})
        .unique(),
    name: text('name').notNull(),
    lastName: text('lastName'),
    imageId: text("imageId"),
    image: text('image'),
})

export const sessions = pgTable('sessions',{
    id: text('id').primaryKey(),
    userId: integer('userId').references(() => users.id),
    expired_at: timestamp('expired_At',{mode:"date",withTimezone:true}).notNull()
},(table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId)
}))


export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect
export type Profile = typeof profiles.$inferSelect