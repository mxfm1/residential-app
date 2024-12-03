'use client'

import CustomFormInput from "@/components/form/custom-input";
import FormComponent from "@/components/form/form";
import { loginSchema } from "@/lib/schemas";
import { Mail } from "lucide-react";
import { z } from "zod";

type LoginFormType = z.infer <typeof loginSchema>

export default function LoginPage(){
    const handleLoginForm = (data:LoginFormType) => {
        console.log("LOGIN FORM DATA",data)
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
            </div>
        </div>
    )
}