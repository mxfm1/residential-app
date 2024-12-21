import { database } from "@/db"
import { profile } from "@/db/schema"

export const createProfile = async(userId:number,name:string,lastName?:string) => {
    const [newProfile] = await database.insert(profile).values({
        userId,
        name,
        lastName
    }).returning()

    return newProfile
}