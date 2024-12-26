'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const notAllowedRoutes = [""]

export default function NavbarWrapper({children}:{children:ReactNode}){

    const path = usePathname()
    const notVisible = notAllowedRoutes.includes(path)

    return (
        <header className={cn("flex py-2 border-b bg-background",notVisible && "hidden")}>
            <nav className="font-medium flex items-center text-sm gap-6 container py-3 mx-auto">
            {children}
            </nav>
        </header>   
    )
}

