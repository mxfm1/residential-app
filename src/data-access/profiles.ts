import { database } from "@/db"
import { profiles } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createProfile = async(userId:number,name:string,lastName?:string) => {
    const [newProfile] = await database.insert(profiles).values({
        userId,
        name,
        lastName
    }).returning()

    return newProfile
}

export const getProfile = async(userId:number) => {
    const userProfile = await database.query.profiles.findFirst({
        where: eq(profiles.userId,userId)
    })
    return userProfile;
}