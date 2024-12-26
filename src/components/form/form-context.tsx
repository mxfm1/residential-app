'use client';

import { useContext, createContext, ReactNode } from "react";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";

type FormContextType<T extends FieldValues = FieldValues> = UseFormReturn<T>;

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = <T extends FieldValues>() => {
    const context = useContext(FormContext);
    if (!context) throw new Error("Este hook debe ser utilizado dentro de un FormProvider");
    return context as FormContextType<T>;
};

export const FormProvider = <T extends FieldValues>({
    children,
    methods,
}: {
    children: ReactNode;
    methods: UseFormReturn<T>;
}) => {
    return (
        <FormContext.Provider value={methods as unknown as FormContextType<FieldValues>}>
            {children}
        </FormContext.Provider>
    );
};
// 'use client';

// import { useContext, createContext, ReactNode } from "react";
// import { useForm, UseFormReturn } from "react-hook-form";

// // Define el tipo de datos que tendrá el formulario
// type FormContextType<T> = UseFormReturn<T>;

// // Crea el contexto con un valor por defecto de tipo `undefined`
// const FormContext = createContext<FormContextType<any> | undefined>(undefined);

// // Hook para usar el contexto
// export const useFormContext = <T extends object>() => {
//     const context = useContext(FormContext);
//     if (!context) throw new Error("Este hook debe ser utilizado dentro de un FormProvider");
//     return context as FormContextType<T>; // Aplica tipado explícito
// };

// // Proveedor del contexto
// export const FormProvider = <T extends object>({
//     children,
//     defaultValues,
// }: {
//     children: ReactNode;
//     defaultValues: T; // Valores iniciales del formulario
// }) => {
//     const methods = useForm<T>({ defaultValues }); // Inicializa `useForm`

//     return (
//         <FormContext.Provider value={methods}>
//             {children}
//         </FormContext.Provider>
//     );
// };