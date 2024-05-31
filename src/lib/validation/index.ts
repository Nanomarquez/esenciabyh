import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, {message: "Demasiado corto"}).max(50, {message: "Demasiado largo"}),
  lastname: z.string().min(2, {message: "Demasiado corto"}).max(50, {message: "Demasiado largo"}),
  email: z.string().email({message: "Email invalido"}),
  password: z.string().min(8, {message: "Contraseña debe tener al menos 8 caracteres"}),
  phone: z.string()
    .optional()
    .refine(val => 
      val === undefined || val === "" || val.length >= 10, { message: "El telefono debe tener 10 caracteres minimo" })
});

export const SigninValidation = z.object({
  email: z.string().email({message: "Email invalido"}),
  password: z.string().min(8, {message: "Contraseña debe tener al menos 8 caracteres"})
});