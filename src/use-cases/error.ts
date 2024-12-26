export class PublicError extends Error{
    constructor(message:string){
        super(message) 
    }
}

export class LoginError extends PublicError{
    constructor(){
        super("Correo o contraseña inválidos")
        this.name="Login Error"
    }
}
