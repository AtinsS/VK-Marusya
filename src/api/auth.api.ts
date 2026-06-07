import type { SuccessfulResult, User } from "../entities/auth/types";
import { api } from "./http-client";

export const AuthApi = {
  login: (email: string, password: string) =>
    api.post<SuccessfulResult>("/auth/login", { email, password }),
  logout: () => api.get<SuccessfulResult>("/auth/logout"),
  register: (email: string, password: string, name: string, surname: string) =>
    api.post<SuccessfulResult>("/auth/register", {
      email,
      password,
      name,
      surname,
    }),
  getProfile: () => api.get<User>("/auth/profile"),
};
