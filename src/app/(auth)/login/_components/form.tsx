
import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { FieldValues, Form, useForm, UseFormProps } from "react-hook-form"

type FormComponentProps<T extends FieldValues> = PropsWithChildren<{
    submitLogic: (value: T) => void;
    formOptions: UseFormProps<T>
    mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all"
    buttonLabel?:string
}>

export default function FormComponent<T extends FieldValues>({formOptions,submitLogic,children,mode,buttonLabel}:FormComponentProps<T>){

    const form = useForm<T>({
        ...formOptions,
        mode:mode,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitLogic)}>
                {children}

            <div className="flex items-center justify-center">
                <button type="submit">
                    {buttonLabel ? buttonLabel :"Enviar.."}
                </button>
            </div>
            </form>
        </Form>
    )
}