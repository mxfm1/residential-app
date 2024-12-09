import { database } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUserByEmail = async(email:string) => { 
    const prevUser = await database.query.user.findFirst({
        where: eq(user.email,email)
    })

    return prevUser
}

export const createUser = async(email:string) => {
    const [createdUser] = await database.insert(user).values({
        email
    }).returning()

    return createdUser
}