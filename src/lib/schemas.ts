import {z} from 'zod'

const expReg = /^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{5,}$/

export const registerSchema = z.object({
    name: z.string().min(1,{message:"Min 3 caracteres.."}),
    lastName: z.string().optional(),
    email: z.string().email({message:"Email inválido.."}),
    password: z.string().min(5,{message:"Min 5 carácteres.."}).regex(expReg,{message:"1 mayúscula mínimo.."}),
    confirmPassword: z.string().min(5,{message:"Min 5 caracteres.."})
}).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Las contraseñas deben coincidir..",
      path: ["confirmPassword"], // Esto especifica dónde se muestra el mensaje de error
    })  