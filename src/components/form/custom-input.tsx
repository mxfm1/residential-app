import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { LucideIcon } from "lucide-react";
import { useFormContext } from "./form-context";

type CustomInputFormProps = {
    label?: string;
    name: string;
    type:string;
    control?: Control<any> | undefined;
    error?:string
    icon?: LucideIcon
}

export default function CustomFormInput({ name, type, label, error, icon: Icon }: CustomInputFormProps) {
    
        const { control } = useFormContext()
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
                                type={type}
                                className={`mb-0 ${Icon ? "pl-8" : ""}`}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}