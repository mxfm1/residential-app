import { useFormContext } from "@/components/form/form-context";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

type FormInputProps = {
    name: string;
    label?:string;
    type: string;
    icon?: LucideIcon
}

export default function FormInput({name,label,type,icon}:FormInputProps){

    const{ control } = useFormContext()

    return (
        <FormField
            name={name}
            control={control}
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        {label && <FormLabel>{label}</FormLabel>}
                        <Input
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}