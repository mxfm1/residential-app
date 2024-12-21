'use client'

import CustomFormInput from "@/components/form/custom-input";
import FormComponent from "@/components/form/form";
import { loginSchema } from "@/lib/schemas";
import { Mail } from "lucide-react";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { userLoginAction } from "./actions";

export type LoginFormType = z.infer <typeof loginSchema>

export default function LoginPage(){

    const {execute,isPending,error} = useServerAction(userLoginAction)


    const handleLoginForm = (data:LoginFormType) => {
        execute(data)
    }

    return (
        <div>
            <div>
                <FormComponent 
                    submitLogic={handleLoginForm}
                    formOptions={{
                        defaultValues:{
                            email: "",
                            password: ""
                        }
                }}>
                    <CustomFormInput name="email" label="email" type="email" icon={Mail}/>
                    <CustomFormInput name="password" label="password" type="password" />
                </FormComponent>
                {error && (
                    <div className="flex items-center justify-center">
                        <p className="text-red-500">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
