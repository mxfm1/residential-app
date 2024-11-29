import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { registerFormType } from "@/lib/types/auth";
import { PropsWithChildren } from "react";
import { FormProvider } from "./form-context";

type FormComponentProps<T extends FieldValues> = PropsWithChildren<{
    submitLogic: (values: T) => void;
    formOptions: UseFormProps<T>;
}>;

export default function FormComponent<T extends FieldValues>({ submitLogic, children,formOptions}: FormComponentProps<T>) {

    const formMethods = useForm<T>({
        ...formOptions,
        mode: "onBlur"
    })

    return (
        <FormProvider methods={formMethods}>
            <Form {...formMethods}>
                {children}
                <form onSubmit={formMethods.handleSubmit(submitLogic)} className="space-y-2">
                    <div className="flex items-center justify-center">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}