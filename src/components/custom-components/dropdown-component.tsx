
import { PropsWithChildren, ReactNode } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

type DropdownWrapperProps =  PropsWithChildren & {
    trigger: ReactNode
}
export default function DropdownWrapper({trigger}:DropdownWrapperProps){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
        </DropdownMenu>
    )
}