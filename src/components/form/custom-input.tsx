import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { Eye, EyeOff, LucideIcon, User } from "lucide-react";
import { useFormContext } from "./form-context";
import { useState } from "react";

type CustomInputFormProps = {
    label?: string;
    name: string;
    type:string;
    control?: Control<any> | undefined;
    error?:string
    icon?: LucideIcon
}

export default function CustomFormInput({ name, type, label, error, icon: Icon }: CustomInputFormProps) {

        const[showPassword,setShowPassword] = useState<boolean>(false)
        const { control } = useFormContext()
        const isPasswordField = type === 'password'
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className="">
                    {label && <FormLabel className="mb-0 text-sm">{label}</FormLabel>}
                    
                    <div className="relative flex items-center">
                        {Icon && <Icon className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />}
                        <FormControl>
                            <Input
                                {...field}
                                type={isPasswordField && !showPassword ? "password" : "text"}
                                className={`mb-0 ${Icon ? "pl-8" : ""} rounded-lg`}
                            />
                        </FormControl>
                        {isPasswordField && (
                            <button 
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-700"
                                onClick={() => setShowPassword((value) => !value)}>
                                {showPassword ? <EyeOff size={22} className="transition-all duration-500"/> : <Eye size={22} className="transition-all duration-500"/>}
                            </button>
                        )}
                    </div>
                    <div className="relative pb-4">
                        <FormMessage  className="absolute"/>
                    </div>
                </FormItem>
            )}
        />
    );
}