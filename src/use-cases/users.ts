import { createProfile } from "@/data-access/profiles";
import { createUser,getUserByEmail, validatePassword } from "@/data-access/users";
import { createAccount } from "@/data-access/account";
import { LoginError } from "./error";

type userRegistrationProps = {
    name:string;
    lastName?:string;
    email:string;
    password:string
}

export const userRegistrationUseCase = async({name,lastName,email,password}:userRegistrationProps) =>  {
    const existingUser = await getUserByEmail(email)
    if(existingUser){
        throw new Error('Este correo ya está siendo utilizado..')
    }
    const user = await createUser(email)
    await createAccount(user.id,password)
    await createProfile(user.id,name,lastName)
    return { id: user.id}
}

export const loginUserUseCase = async(email:string,password:string) => {
    const existingUser = await getUserByEmail(email)
    if(!existingUser) throw new LoginError()
    
    const isValidCredentials = await validatePassword(existingUser.id,password)
    if(!isValidCredentials) throw new LoginError()

    return { id: existingUser.id };
}