'use server'

import { useAuthModal } from "@/context/auth-modal"
import { getCurrentUser } from "./session"

export const useAuthValidation = async() => {
    const user = await getCurrentUser()

    const isLoggedIn = !!user
    console.log('user data',user)
    return { user}   
}