'use client'

import { useContext,createContext, ReactNode } from "react"
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form"

type FormContextType<T extends FieldValues = FieldValues> = UseFormReturn<T>

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useLoginFormContext = <T extends FieldValues>() => {
    const context = useContext(FormContext)
    if(!context) throw new Error("Este custom hook debe ser utilizado dentro de un proveedor")
    return context as FormContextType<T>
}

const LoginFormProvider = <T extends FieldValues>({
    children,
    methods
}:{
    children:ReactNode,
    methods: UseFormReturn<T>
}) => {
    return (
        <FormContext.Provider value={methods as unknown as FormContextType<FieldValues>}>
            {children}
        </FormContext.Provider>
    )
}

export {LoginFormProvider}

type FormContext1<T extends FieldValues = FieldValues> = UseFormReturn<T>

const Context1 = createContext<FormContext1 | undefined>(undefined)

const useContextFormHook = <T extends FieldValues>() => {
    const context = useContext(Context1)
    if(!context) throw new Error("xd")
    return context as FormContext1<T>    
}

export const FormContextProvider = <T extends FieldValues>({
    children,
    methods
}:{
    children:ReactNode,
    methods: UseFormReturn<T>
}) => {
    return (
        <Context1.Provider value={methods as unknown as FormContext1<FieldValues>}>
            {children}
        </Context1.Provider>
    )
}