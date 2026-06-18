import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AuthInfoSchema,
  RegisterFormSchema,
  type LoginForm,
  type RegisterForm,
} from "../entities/auth/types";

export const useLoginForm = () => {
  return useForm<LoginForm>({
    resolver: zodResolver(AuthInfoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
};

export const useRegisterForm = () => {
  return useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
};
