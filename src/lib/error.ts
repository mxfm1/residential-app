import { PublicError } from "@/use-cases/error"

export class RateLimitError extends Error{
    constructor(){
        super("Haz hecho muchas solicitudes..")
        this.name = 'RateLimitError'
    }
}
