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

export const ForgotPasswordValidation = z.object({
  email: z.string().email({message: "Email invalido"})
});

export const NewPasswordValidation = z.object({
  password: z.string().min(8, {message: "Contraseña debe tener al menos 8 caracteres"})
});

export const UpdateProfileValidation = z.object({
  name: z.string().min(2, {message: "Demasiado corto"}).max(50, {message: "Demasiado largo"}),
  lastname: z.string().min(2, {message: "Demasiado corto"}).max(50, {message: "Demasiado largo"}),
  email: z.string().email({message: "Email invalido"}),
  password: z.string().min(8, {message: "Contraseña debe tener al menos 8 caracteres"}),
  newPassword: z.string().optional().refine(val => val === undefined || val === "" || val.length >= 8, { message: "Contraseña debe tener al menos 8 caracteres" }),
  phone: z.string()
    .optional()
    .refine(val => 
      val === undefined || val === "" || val.length >= 10, { message: "El telefono debe tener 10 caracteres minimo" }),
  file: z.custom<File[]>()
});

export const PostValidation = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  file: z.array(z.instanceof(File)),
  coverImage: z.instanceof(File),
  postImages: z.array(z.instanceof(File)),
  categories: z.array(z.string()).min(1, "Al menos una categoría es obligatoria").max(3, "Máximo 3 categorías"),
});