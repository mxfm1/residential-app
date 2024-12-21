'use client'

import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { Form } from "../ui/form";
import { PropsWithChildren } from "react";
import { FormProvider } from "./form-context";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type FormComponentProps<T extends FieldValues> = PropsWithChildren<{
    submitLogic: (values: T) => void;
    formOptions: UseFormProps<T>;
    buttonLabel?:string;
    isPending?:boolean
}>;

export default function FormComponent<T extends FieldValues>({ submitLogic, children,formOptions,buttonLabel,isPending}: FormComponentProps<T>) {

    const formMethods = useForm<T>({
        ...formOptions,
        mode: "onBlur"
    })

    return (
        <FormProvider methods={formMethods}>
            <Form {...formMethods}>
                {children}
                <form onSubmit={formMethods.handleSubmit(submitLogic)} className="">
                    <div className="flex items-center justify-center">
                        <Button type="submit" className="min-w-40">
                            {isPending ? <Loader className="animate-spin w-4 h-4"/> : buttonLabel ? buttonLabel : "Enviar.."}
                        </Button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}