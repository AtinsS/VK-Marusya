import { useState } from "react";
import marusyaBlack from "../../../assets/marusyaBlack.svg";
import "./AuthModal.css";

export const AuthModal = ({ onClose }) => {
  const [authMode, setAuthMode] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === "register") {
      setAuthMode("success");
    } else {
      console.log("Login"); // !Потом убрать
    }
  };

  const handleLoginClick = () => {
    setAuthMode("login");
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

        {/* Экран успеха */}
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

        {/* Формы входа и регистрации */}
        {authMode !== "success" && (
          <>
            {authMode !== "login" && (
              <h3 className="modal-auth__registration-title">Регистрация</h3>
            )}

            <form className="modal-auth__form" onSubmit={handleSubmit}>
              {authMode === "register" && (
                <>
                  <input
                    type="email"
                    className="modal-auth__input modal-auth__input--email"
                    placeholder="sample@domain.ru"
                    required
                  />
                  <input
                    type="text"
                    className="modal-auth__input modal-auth__input--name"
                    placeholder="Имя"
                    required
                  />
                  <input
                    type="text"
                    className="modal-auth__input modal-auth__input--name"
                    placeholder="Фамилия"
                    required
                  />
                  <input
                    type="password"
                    className="modal-auth__input modal-auth__input--password"
                    placeholder="Пароль"
                    required
                  />
                  <input
                    type="password"
                    className="modal-auth__input modal-auth__input--password"
                    placeholder="Подтвердите пароль"
                    required
                  />
                </>
              )}

              {authMode === "login" && (
                <>
                  <input
                    type="email"
                    className="modal-auth__input modal-auth__input--email"
                    placeholder="Электронная почта"
                    required
                  />
                  <input
                    type="password"
                    className="modal-auth__input modal-auth__input--password"
                    placeholder="Пароль"
                    required
                  />
                </>
              )}

              <button type="submit" className="modal-auth__button">
                {authMode === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            </form>

            <div
              className="modal-auth__link"
              onClick={() =>
                setAuthMode(authMode === "login" ? "register" : "login")
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
