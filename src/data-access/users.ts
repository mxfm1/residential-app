import { database } from "@/db"
import { user } from "@/db/schema"
import { LoginError } from "@/use-cases/error"
import { eq } from "drizzle-orm"
import { getUserAccountById, passwordHashing } from "./account"

export const getUserByEmail = async(email:string) => {
    const queryUser = await database.query.user.findFirst({
        where: eq(user.email,email)
    })
    return queryUser
}

export const getUserById = async(userId:number) => {
    const existingUser = await database.query.user.findFirst({
        where: eq(user.id,userId)
    })
    return existingUser
}

export const createUser = async(email:string) => {
    const [createdUser] = await database.insert(user).values({
        email
    }).returning()

    return createdUser;
}

export const validatePassword = async(userId:number, plainTextPassword:string) => {
    const existingUser = await getUserById(userId)
    if(!existingUser) return false

    const account = await getUserAccountById(userId)
    if(!account) return false

    const salt = account.salt
    const password = account.password

    if(!salt || !password) return false

    const hashGivenPassword = await passwordHashing(plainTextPassword,salt)
    return hashGivenPassword === password
}