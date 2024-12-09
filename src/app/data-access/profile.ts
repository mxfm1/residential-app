import { database } from "@/db";
import { profile } from "@/db/schema";

type createProfileProps = {
    name:string;
    lastName:string,
}

export const createProfile = async({name,lastName}:createProfileProps) => {
    const [userProfile] = await database.insert(profile).values({
        name,
        lastName
    }).returning()

    return userProfile
}

