import { z } from "zod";
import { registerSchema } from "../schemas";

export type registerFormType = z.infer<typeof registerSchema>