'use client'

import CustomFormInput from "@/components/form/custom-input"
import FormComponent from "@/components/form/form"
import { registerSchema } from "@/lib/schemas"
import { registerFormType } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail,Lock } from "lucide-react"
import { useServerAction } from "zsa-react"
import { registerAction } from "./actions"

export default function RegisterPage(){

    const {execute} = useServerAction(registerAction)

    const registerFormSubmit = (data: registerFormType) => {
        console.log("CLIENT DATA ", data)
        execute(data);
    }
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="p-4 bg-slate-100 rounded-md shadow-xl h-[500px]">
                    <FormComponent
                        submitLogic={registerFormSubmit}
                        formOptions={{
                            defaultValues:{
                                name: "",
                                lastName: "",
                                email: "",
                                password: "",
                                confirmPassword: "" 
                            },
                            resolver: zodResolver(registerSchema)
                        }}
                        buttonLabel="Registrate.."
                        >
                        <div className="flex gap-2">
                            <CustomFormInput label="Nombre" name="name" type="string" />
                            <CustomFormInput label="Apellido" name="lastName" type="string" />
                        </div>
                        <CustomFormInput label="Correo" name="email" type="email" icon={Mail}/>
                        <CustomFormInput label="Contraseña" name="password" type="password" icon={Lock}/>
                        <CustomFormInput label="Confirma Contraseña" name="confirmPassword" type="password" />
                    </FormComponent>
                </div>
            </div>
        </div>
    )
}