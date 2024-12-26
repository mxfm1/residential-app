'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuthModal } from "@/context/auth-modal";
import FormComponent from "../form/form";
import CustomFormInput from "../form/custom-input";
import { useServerAction } from "zsa-react";
import { userLoginAction } from "@/app/(auth)/login/actions";
import { Mail,RectangleEllipsis } from "lucide-react";
import { LoginFormType } from "@/app/(auth)/login/page";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import Image from "next/image";

export default function AuthModal() {
    const {isOpen,setIsOpen} = useAuthModal()

    const {execute,isPending,error} = useServerAction(userLoginAction)

    const handleLoginForm = (data:LoginFormType) => {
      execute(data)
    }
  // SIDE MOTION CON FRAMER
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Inicia sesión</DialogTitle>
          <DialogDescription>
            Para consumir este contenido debes iniciar sesión previamente..
          </DialogDescription>
        </DialogHeader>

          <FormComponent
            buttonLabel="Iniciar sesion"
            submitLogic={handleLoginForm}
            isPending={isPending}
            formOptions={{
                defaultValues:{
                    email: "",
                    password: ""
                },
                resolver: zodResolver(loginSchema)
              }}>
              <LoginModalCore errorMessage={error?.message}/>
          </FormComponent>

              <div className="relative flex items-center mt-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="">
                <Button className="w-full">
                  <Image src="/svg/google.svg" width={20} height={20} alt="google-icon"/>
                  Google
                </Button>
              </div>

              <div></div>
      </DialogContent>
    </Dialog>
  );
}

type LoginModalCoreProps = {
  errorMessage?:string
}

function LoginModalCore({errorMessage}:LoginModalCoreProps){
  return (
    <>
      <CustomFormInput name="email" type="email" icon={Mail} label="Email"/>
      <CustomFormInput name="password" type="password" icon={RectangleEllipsis} label="Password"/>
        {errorMessage && (
            <div className="flex items-center justify-center">
                <p className="text-red-500">{errorMessage}</p>
            </div>
        )}
    </>
  )
}