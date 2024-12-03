'use client'

import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { Form } from "../ui/form";
import { PropsWithChildren } from "react";
import { FormProvider } from "./form-context";
import { Button } from "../ui/button";

type FormComponentProps<T extends FieldValues> = PropsWithChildren<{
    submitLogic: (values: T) => void;
    formOptions: UseFormProps<T>;
    buttonLabel?:string;
}>;

export default function FormComponent<T extends FieldValues>({ submitLogic, children,formOptions,buttonLabel}: FormComponentProps<T>) {

    const formMethods = useForm<T>({
        ...formOptions,
        mode: "onBlur"
    })

    return (
        <FormProvider methods={formMethods}>
            <Form {...formMethods}>
                {children}
                <form onSubmit={formMethods.handleSubmit(submitLogic)} className="space-y-2">
                    <div className="flex items-center justify-center pt-6">
                        <Button type="submit" className="">
                            {buttonLabel ? buttonLabel : "Enviar..."}
                        </Button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}