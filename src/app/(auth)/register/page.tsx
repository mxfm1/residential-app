'use client'

import CustomFormInput from "@/components/form/custom-input"
import FormComponent from "@/components/form/form"
import { useFormContext } from "@/components/form/form-context"
import { registerSchema } from "@/lib/schemas"
import { registerFormType } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"

export default function RegisterPage(){

    const registerFormSubmit = (data:registerFormType) => {
        console.log("DATA A EXPONER",data)
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
                                email: "",
                                password: "",
                                confirmPassword: "" 
                            },
                            resolver: zodResolver(registerSchema)
                        }}
                        >
                        <div className="flex gap-2">
                            <CustomFormInput label="Nombre" name="name" control={undefined} type="string" />
                            <CustomFormInput label="Apellido" name="lastName" control={undefined} type="string" />
                        </div>
                        <CustomFormInput label="Correo" name="email" control={undefined} type="email" />
                        <CustomFormInput label="Contraseña" name="password" control={undefined} type="password" />
                        <CustomFormInput label="Confirma Contraseña" name="confirmPassword" control={undefined} type="password" />
                    </FormComponent>
                </div>
            </div>
        </div>
    )
}