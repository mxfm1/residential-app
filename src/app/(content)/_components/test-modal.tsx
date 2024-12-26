'use client'

import { useAuthModal } from "@/context/auth-modal"

export default function Test(){
    const {isOpen,setIsOpen} = useAuthModal()
    console.log("ISOPEN VALUE",isOpen)
    return (<></>)
}