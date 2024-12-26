import { getProfile } from "@/data-access/profiles"
import { PublicError } from "./error"
import { cache } from "react"

export const getUserProfileUseCase = cache(async(userId:number) => {
    const profile = await getProfile(userId)

    if(!profile) throw new PublicError("Usuario no encontrado..")
    return profile
});