import { NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.css";

export const ProfilePage = () => {
  return (
    <>
      <div className="profile-page">
        <h1 className="profile-page__title">Мой аккаунт</h1>
        <div className="profile-page__nav-wrapper">
          <NavLink
            className="profile-page__link profile-page__link--favorites"
            to={"/profile/favorites"}
          >
            Избранные фильмы
          </NavLink>
          <NavLink
            className="profile-page__link profile-page__link--settings"
            to={"/profile/settings"}
          >
            Настройки Акканута
          </NavLink>
        </div>
        <div className="profile-page__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
