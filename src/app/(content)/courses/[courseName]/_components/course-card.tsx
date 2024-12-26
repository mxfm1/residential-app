'use client'

import { Button } from "@/components/ui/button"
import { useAuthModal } from "@/context/auth-modal"
import { FolderLock, GraduationCap, Heart, Lock } from "lucide-react"
import Image from "next/image"

// valido si el usuario esta logeado
// le despliego el modal para que se registre 
// BOTON ANIMACION DE CARGANDO PARA DAR FEEDBACK AL USUARIO QUE ESTOY INICIANDO SESION, DESPUES
// 
type CourseDescriptionCardProps = {
    isAuth: boolean;
}
export default function CourseDescriptionCard({isAuth}:CourseDescriptionCardProps){
    const{isOpen,setIsOpen} =useAuthModal()

    const handleCourseStart = () => {
        if(!isAuth){
            setIsOpen(true)
        }
    }

    return (
        <div className="lg:shadow-xl w-[600px] lg:max-w-96 lg:min-w-72 lg:border-primary bg-card mx-auto">
                <div className="relative w-full h-32 border-b">
                    <Image src="/logo/fides-logo.png" fill objectFit="cover" alt="course-img"/>
                </div>
                <div className="py-3 px-5">
                    <h1>Escuela Informatica</h1>
                    <p>Curso hacking wifi</p>
                    <p>Roadmap</p>
                <div className="flex">
                    <Button onClick={handleCourseStart}>
                        Empezar
                    </Button>
                    <Button><Heart /></Button>
                </div>
                <div className="flex text-primary text-sm items-center space-x-2">
                    <FolderLock size={18} />
                    <span>Contenido bloqueado..</span>
                </div>

                <h2 className="font-bold">Este recurso incluye:</h2>
                <ul>
                    <li className="flex gap-2 ml-3"><GraduationCap /> Certificado</li>
                </ul>
            </div>
        </div>
    )
}