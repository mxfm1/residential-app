'use server'

import { rateLimitByIp } from "@/lib/limiter"
import { unauthenticatedAction } from "@/lib/safe-actions"
import { registerSchema } from "@/lib/schemas"
import { setSession } from "@/lib/session"
import { userRegistrationUseCase } from "@/use-cases/users"
import { redirect } from "next/navigation"

export const registerAction = unauthenticatedAction
    .createServerAction()
    .input(
       registerSchema
    )
    .handler(async({input}) => {
        await rateLimitByIp({key:"register",limit:3,window:30000})
        const user = await userRegistrationUseCase(input)
        await setSession(user.id)
        return redirect("/inicio")
    })
