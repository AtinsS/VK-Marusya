import { NavLink } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <div>
      <section className="profile-page">
        <h1 className="profile-page__title">Мой аккаунт</h1>
        <NavLink className="profile-page__link" to={"/profile/favorites"}>
          Избранные фильмы
        </NavLink>
        <NavLink className="profile-page__link" to={"/profile/settings"}>
          Настройки Акканута
        </NavLink>
      </section>
    </div>
  );
};
