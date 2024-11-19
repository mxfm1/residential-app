import { 
    boolean,
    index,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    uuid
} from 'drizzle-orm/pg-core'

export const accountTypeEnum = pgEnum("accountType",["email","google"])

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    email: text().unique(),
    emailDateVerify: timestamp("emailVerified",{mode: "date"}),
    emailVerified: boolean().default(false)
})

export const account = pgTable("accounts",{
    id: uuid().defaultRandom().primaryKey(),
    userId: integer().references(() => users.id,{onDelete: "cascade"}),
    accountType: accountTypeEnum("accountType").notNull(),
    googleId: text("googleId").unique(),
    password: text().notNull(),
    salt: text().notNull()
})

export const profile = pgTable("profile",{
    id: uuid().defaultRandom().primaryKey(),
    name: text("name").notNull(),
    secondName: text("secondName"),
    lastName: text("lastName").notNull(),
    imageId: text("imageId"),
    image: text("image")
})

export const sessions = pgTable("sessions",{
    id: serial().primaryKey(),
    userId: integer("userId")
        .references(() => users.id,{onDelete:"cascade"}),
    expiresAt: timestamp("expires_at",{
        mode:"date",
        withTimezone:true
    }).notNull(),
},
    (table) => ({
        userIdIdx: index("session_user_id_idx").on(table.userId)
    })
)


