import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  checkAuth as checkAuthThunk,
  clearError as clearErrorAction,
  login as loginThunk,
  logout as logoutThunk,
  register as registerThunk,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuth, status, error } = useAppSelector((state) => state.auth);

  const login = useCallback(
    (email: string, password: string) =>
      dispatch(loginThunk({ email, password })),
    [dispatch],
  );

  const register = useCallback(
    (email: string, password: string, name: string, surname: string) =>
      dispatch(registerThunk({ email, password, name, surname })),
    [dispatch],
  );

  const checkAuth = useCallback(() => dispatch(checkAuthThunk()), [dispatch]);
  const logout = useCallback(() => dispatch(logoutThunk()), [dispatch]);
  const clearError = useCallback(
    () => dispatch(clearErrorAction()),
    [dispatch],
  );

  return {
    user,
    isAuth,
    isLoading: status === "loading",
    status,
    error,
    login,
    register,
    checkAuth,
    logout,
    clearError,
  };
};
