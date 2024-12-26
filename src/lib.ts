export const AUTHENTICATION_ERROR_MESSAGE = 
    "Debes iniciar sesión para ver este contenido"

export const AuthenticationError = class AuthenticationError extends Error{
    constructor(){
        super(AUTHENTICATION_ERROR_MESSAGE)
        this.name="AuthenticationError"
    }
}