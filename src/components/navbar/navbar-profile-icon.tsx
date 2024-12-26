import { Suspense } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,DropdownMenuSeparator } from "../ui/dropdown-menu";
import ProfileAvatar from "../avatar/profile-avatar";
import { getUserProfileUseCase } from "@/use-cases/profile";
import Link from "next/link";
import { toUpperCase } from "@/lib/textFn";
import { Book, LucideIcon } from "lucide-react";
import { Profile } from "@/db/schema";
import LogoutButton from "../logout-button";

type NavbarProfileIconProps = {
    userId:number;
    userEmail:string | null;
}

export default async function NavbarProfileIcon({userId,userEmail}:NavbarProfileIconProps){

    const profile = await getUserProfileUseCase(userId)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Suspense fallback={
                    <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                        ..
                    </div>
                }>
                    <ProfileAvatar userId={userId} className="shadow-xl" />
                </Suspense>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="p-4">
                    <div className="flex gap-4 mb-4">
                        <ProfileAvatar userId={userId} className="border-b-2 w-16 h-16 "/>
                        <div>
                            <h2>{toUpperCase(profile.name)} {toUpperCase(profile.lastName)}</h2>
                            <h4 className="text-md font-sans">{userEmail}</h4>
                        </div>
                    </div>
                </div>
                <div className="border-primary border border-t-0 mx-4 " />
                
                <div className="mx-6">
                    <NavbarProfileItem href="/user/cursos" label="Mis cursos" className="cursor-pointer hover:bg-none"/>
                    <NavbarProfileItem href="/?" label="Aplicar"/>
                </div>

                <div className="border-primary border border-t-0 mx-4 " />
                
                <div className="mx-2">

                    <NavbarProfileItem href="/user/perfil" label="Ver Perfil" icon={Book} />
                    <DropdownMenuItem>
                        <LogoutButton />
                    </DropdownMenuItem>
                </div>
               
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
type NavbarProfileItemProps = {
    href:string;
    label:string;
    className?:string
    icon?:LucideIcon,
}

const NavbarProfileItem = ({href,label,className,icon:Icon,...props}:NavbarProfileItemProps) => {
    return (
        <DropdownMenuItem className={className} {...props}>
            <Link href={href} className="flex items-center">
                {Icon && (<Icon />)}
                <p className="text-base">{label}</p>
            </Link>
        </DropdownMenuItem>
    )
}
