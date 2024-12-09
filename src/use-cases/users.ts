import { createProfile } from "@/app/data-access/profile";
import { createUser, getUserByEmail } from "@/app/data-access/users";

type userRegistrationProps = {
    name:string;
    lastName:string;
    email:string;
    password:string
}

export const userRegistrationUseCase = async({name,lastName,email,password}:userRegistrationProps) =>  {
    const user = await getUserByEmail(email)
    if(user){
        throw new Error('Este correo ya está siendo utilizado..')
    }
    
    const newUser = await createUser(email)
    const profile = await createProfile({name,lastName})
}