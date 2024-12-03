import { PublicError } from "@/use-cases/error";
import { createServerActionProcedure } from "zsa";
import { rateLimitByKey } from "./limiter";

function shapeErrors({err}:any){
    const isAllowed = err instanceof PublicError;
    const isDev = process.env.NODE_ENV === 'development'

    if(isAllowed || isDev){
        console.error(err);
        return {
            code: err.code || 'ERROR',
            message: `${isAllowed || isDev ? " Error en desarrollo - ": ""} ${err.message}`
        }
    }else{
        return {
            code: err.code,
            message: "Upss ocurrió un error "
        }
    }
}

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async() => {
        await rateLimitByKey({
            key:`unauthenticated-global`,
            limit: 10,
            window: 10000,
        })
    })