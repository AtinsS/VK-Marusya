import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("Некорректный email"),
  favorites: z.array(z.string()),
});

export const AuthInfoSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Нужна хотя бы одна заглавная буква")
    .regex(/[a-z]/, "Нужна хотя бы одна строчная буква")
    .regex(/[0-9]/, "Нужна хотя бы одна цифра")
    .regex(/[^A-Za-z0-9]/, "Нужен спецсимвол"),
});

export const RegisterDataSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Нужна хотя бы одна заглавная буква")
    .regex(/[a-z]/, "Нужна хотя бы одна строчная буква")
    .regex(/[0-9]/, "Нужна хотя бы одна цифра")
    .regex(/[^A-Za-z0-9]/, "Нужен спецсимвол"),
  name: z
    .string()
    .min(2, "Имя должно содержать не менее 2 символов")
    .optional(),
  surname: z
    .string()
    .min(2, "Фамилия должна содержать не менее 2 символов")
    .optional(),
});

export const SuccessfulResultSchema = z.object({
  result: z.boolean(),
});

export const ErrorSchema = z.object({
  error: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type AuthInfo = z.infer<typeof AuthInfoSchema>;
export type RegisterData = z.infer<typeof RegisterDataSchema>;
export type SuccessfulResult = z.infer<typeof SuccessfulResultSchema>;
export type Error = z.infer<typeof ErrorSchema>;
