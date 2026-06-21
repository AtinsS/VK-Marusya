import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("Некорректный email"),
  favorites: z.array(z.string()),
});

export const AuthInfoSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export const RegisterDataSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Пароль должен содержать хотя бы один специальный символ",
    ),
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  surname: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
});

export const RegisterFormSchema = RegisterDataSchema.extend({
  confirmPassword: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const SuccessfulResultSchema = z.object({
  result: z.boolean(),
});

export const ErrorSchema = z.object({
  error: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type AuthInfo = z.infer<typeof AuthInfoSchema>;
export type RegisterDataBase = z.infer<typeof RegisterDataSchema>;
export type RegisterForm = z.infer<typeof RegisterFormSchema>;
export type SuccessfulResult = z.infer<typeof SuccessfulResultSchema>;
export type Error = z.infer<typeof ErrorSchema>;
export type LoginForm = z.infer<typeof AuthInfoSchema>;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
