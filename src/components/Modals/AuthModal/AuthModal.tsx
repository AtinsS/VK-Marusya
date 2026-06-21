import { useState } from "react";
import marusyaBlack from "../../../assets/marusyaBlack.svg";
import "./AuthModal.css";
import { useAuth } from "../../../hooks/useAuth";
import { useLoginForm, useRegisterForm } from "../../../hooks/useAuthForm";
import type { LoginForm, RegisterForm } from "../../../entities/auth/types";

type AuthMode = "login" | "register" | "success";

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { login, register, isLoading, error, clearError } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useLoginForm();

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useRegisterForm();

  const handleModeChange = (mode: AuthMode) => {
    setAuthMode(mode);
    clearError();
  };

  const onLogin = async (data: LoginForm) => {
    try {
      await login(data.email, data.password).unwrap();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const onRegister = async (data: RegisterForm) => {
    try {
      await register(
        data.email,
        data.password,
        data.name,
        data.surname,
      ).unwrap();
      handleModeChange("success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginClick = () => {
    handleModeChange("login");
  };

  return (
    <div className="modal-auth">
      <div className="modal-auth__wrapper">
        <button className="modal-auth__close" onClick={onClose}></button>
        <img
          className="modal-auth__img"
          src={marusyaBlack}
          alt="Логотип Маруси"
        />

        {/* Авторизация */}
        {authMode === "success" && (
          <div className="modal-auth__success">
            <h2 className="modal-auth__success-title">Регистрация завершена</h2>
            <p className="modal-auth__success-text">
              Используйте вашу электронную почту для входа
            </p>
            <button
              className="modal-auth__button modal-auth__button--blue"
              onClick={handleLoginClick}
            >
              Войти
            </button>
          </div>
        )}

        {/* Успешная регистрация */}
        {authMode !== "success" && (
          <>
            {authMode !== "login" && (
              <h3 className="modal-auth__registration-title">Регистрация</h3>
            )}

            {/*  Ошибка основная */}
            {error && <p className="modal-auth__error">{`Ошибка: ${error}`}</p>}

            {/* Логин */}
            {authMode === "login" && (
              <form
                className="modal-auth__form"
                onSubmit={handleLoginSubmit(onLogin)}
              >
                <input
                  {...loginRegister("email")}
                  type="email"
                  className={`modal-auth__input modal-auth__input--email ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--emailRed"
                      : ""
                  }`}
                  placeholder="Электронная почта"
                />

                <input
                  {...loginRegister("password")}
                  type="password"
                  className={`modal-auth__input modal-auth__input--password ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--passwordRed"
                      : ""
                  }`}
                  placeholder="Пароль"
                />
                <button
                  type="submit"
                  className="modal-auth__button"
                  disabled={isLoading}
                >
                  {isLoading ? "Подождите..." : "Войти"}
                </button>
              </form>
            )}

            {/* Регистрация */}
            {authMode === "register" && (
              <form
                className="modal-auth__form"
                onSubmit={handleRegisterSubmit(onRegister)}
              >
                <input
                  {...registerRegister("email")}
                  type="email"
                  className={`modal-auth__input modal-auth__input--email ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--emailRed"
                      : ""
                  }`}
                  placeholder="sample@domain.ru"
                />

                <input
                  {...registerRegister("name")}
                  type="text"
                  className={`modal-auth__input modal-auth__input--name ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--nameRed"
                      : ""
                  }`}
                  placeholder="Имя"
                />
                <input
                  {...registerRegister("surname")}
                  type="text"
                  className={`modal-auth__input modal-auth__input--name ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--nameRed"
                      : ""
                  }`}
                  placeholder="Фамилия"
                />

                <input
                  {...registerRegister("password")}
                  type="password"
                  className={`modal-auth__input modal-auth__input--password ${
                    loginErrors.email
                      ? "modal-auth__input--error modal-auth__input--passwordRed"
                      : ""
                  }`}
                  placeholder="Пароль"
                />

                <input
                  {...registerRegister("confirmPassword")}
                  type="password"
                  className="modal-auth__input modal-auth__input--password"
                  placeholder="Подтвердите пароль"
                />
                {registerErrors.confirmPassword && (
                  <p className="modal-auth__error">
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
                {registerErrors.password && (
                  <p className="modal-auth__error">
                    {registerErrors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="modal-auth__button"
                  disabled={isLoading}
                >
                  {isLoading ? "Подождите..." : "Создать аккаунт"}
                </button>
              </form>
            )}

            <div
              className="modal-auth__link"
              onClick={() =>
                handleModeChange(authMode === "login" ? "register" : "login")
              }
            >
              {authMode === "login" ? "Регистрация" : "У меня есть пароль"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
