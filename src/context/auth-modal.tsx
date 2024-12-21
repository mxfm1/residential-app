'use client'

import { useContext,createContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

type AuthModalType = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthModalContxt = createContext<AuthModalType | undefined>(undefined)

export const useAuthModal = () => {
    const context = useContext(AuthModalContxt)
    if(!context) throw new Error("useAuthModal hook debe ser utilizado dentro del AuthModalProvider..")
    return context
}

export const AuthModalProvider = ({children}:{children:ReactNode}) => {
    const[isOpen,setIsOpen] = useState(false)

    return (
        <AuthModalContxt.Provider value={{
            isOpen,
            setIsOpen
        }}>
            {children}
        </AuthModalContxt.Provider>
    )
}