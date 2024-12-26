'use server'

import { AFTER_LOGIN_URL } from "@/app-config";
import { invalidateSession, validateRequest } from "@/lib/auth";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-actions";
import { loginSchema } from "@/lib/schemas";
import { deleteSessionCookie, getCurrentUser, setSession } from "@/lib/session";
import { loginUserUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";

export const userLoginAction = unauthenticatedAction
    .createServerAction()
    .input(loginSchema)
    .handler(async({input}) => {

    await rateLimitByKey({key: input.email, limit:3 , window:10000})
    const user = await loginUserUseCase(input.email,input.password)
    await setSession(user.id)
    redirect(AFTER_LOGIN_URL)
})

export const logoutAction = async() => {
    const { session } = await validateRequest()
    if(!session){
        return redirect("/register")
    }

    await invalidateSession(session.id)
    redirect("/adios")
}