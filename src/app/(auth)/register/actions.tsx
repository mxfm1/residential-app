'use server'

import { unauthenticatedAction } from "@/lib/safe-actions"
import { registerSchema } from "@/lib/schemas"
import { z } from "zod"

export const registerAction = unauthenticatedAction
    .createServerAction()
    .input(
       registerSchema
    )
    .handler(async({input}) => {
        console.log('USER INPUT',input)
    })
