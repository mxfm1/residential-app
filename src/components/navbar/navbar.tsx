'use server'

import { Database, Mail, User } from "lucide-react"
import NavbarWrapper from "./navbar-wrapper"
import { ThemeToggleComponent } from "../theme-toggle-component"
import { getCurrentUser } from "@/lib/session";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileAvatar from "../avatar/profile-avatar";
import { Suspense } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NavbarProfileIcon from "./navbar-profile-icon";
import { getUserProfileUseCase } from "@/use-cases/profile";

type NavbarProps = {
    appName:string;
}

const Navbar = async({appName}:NavbarProps) => {
    return (
        <NavbarWrapper>
                <div className="flex gap-2">
                    <Database className="size-6"/>
                    <h1>{appName}</h1>
                </div>

                
                <div className="ml-auto flex">
                    <NavbarHeaderActions />
                </div>
        </NavbarWrapper>
    )
}

async function NavbarHeaderActions(){
    const user = await getCurrentUser()
    const isLoggedIn = !!user

    return (
        <div>
            {isLoggedIn && (
                <div className="flex items-center gap-8">
                    <ThemeToggleComponent />
                    
                    <NavbarProfileIcon userId={user.id} userEmail={user.email}/>
                    <Button className="flex">
                        <Mail />
                    </Button>
                </div>
            )}
            {!isLoggedIn && (
                <div className="flex gap-2 items-center">
                    <Link href="/login">
                        <Button>
                            Inicia sesión
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="customPrimary">
                            Registrate
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export { Navbar }