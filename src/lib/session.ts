import "server-only";
import { cookies, headers } from "next/headers";
import { createSession, generateSessionToken, validateRequest } from "./auth";
import { cache } from "react";
import { PublicError } from "@/use-cases/error";
import { AuthenticationError } from "@/lib";

const SESSION_COOKIE_NAME = "session"

export async function setSessionTokenCookie(token:string,expiresAt:Date){
    const cookiesObj = await cookies()
    cookiesObj.set(SESSION_COOKIE_NAME,token,{
        httpOnly:true,
        sameSite:"lax",
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path:"/"
    })
}

export async function deleteSessionCookie(){
    const cookiesObj = await cookies()
    cookiesObj.set(SESSION_COOKIE_NAME,"",{
        httpOnly:true,
        sameSite:"lax",
        secure: process.env.NODE_ENV === 'production',
        maxAge:0,
        path: "/"
    })
}

export async function getSessionToken(): Promise<string | undefined>{
    const cookieRes = await cookies()
    const token = cookieRes.get(SESSION_COOKIE_NAME)?.value
    return token
}


export async function setSession(userId:number){
    const token = generateSessionToken()
    const session = await createSession(userId,token)
    setSessionTokenCookie(token,session.expired_at)
}

export const getCurrentUser = cache(async() => {
    const { user } = await validateRequest()
    return user ? {id:user.id,email:user.email} : null
})

export const assertAuthenticated = async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError();
    }
return user;
};

