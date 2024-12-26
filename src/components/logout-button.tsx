'use client'

import { logoutAction } from "@/app/(auth)/login/actions"
import { LogOut } from "lucide-react"

export default function LogoutButton(){
    return (
        <button
            className="w-full" 
            onClick={() => logoutAction()}>
            <div className="flex items-center hover:bg-slate-100 w-full rounded-sm">
                <LogOut />
                <p className="text-base ">Cerrar Sesión</p> 
            </div>
        </button>
    )
}