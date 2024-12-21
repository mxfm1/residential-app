'use client'

import Sidebar from "@/components/sidebar/sidebar"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const  HomeLayout = ({children}:{children:ReactNode}) => {
    return (
        <div className="flex">
            <div className={cn("w-56 overflow-y-hidden shadow-2xl h-screen")}>
                <Sidebar />
            </div>  
            <div>
                {children}
            </div>
        </div>
    )
}

export default HomeLayout