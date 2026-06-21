import "./ProfileSettings.css";
import emailImg from "../../../assets/email2.svg";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

export const ProfileSettings = () => {
  const { logout, user } = useAuth();

  if (!user) return null;

  const userAvatar = (user.name?.[0] ?? "") + (user.surname?.[0] ?? "");

  return (
    <>
      <div className="profile-settings">
        <ul className="profile-settings__list">
          <li className="profile-settings__item">
            <div className="profile-settings__avatar">{userAvatar}</div>
            <div className="profile-settings__info">
              <span className="profile-settings__title">Имя Фамилия</span>
              <span className="profile-settings__content">
                {user.name} {user.surname}
              </span>
            </div>
          </li>
          <li className="profile-settings__item">
            <div className="profile-settings__avatar">
              <img
                className="profile-settings__avatar-img"
                src={emailImg}
                alt="Email"
              />
            </div>
            <div className="profile-settings__info">
              <span className="profile-settings__title">Электронная почта</span>
              <span className="profile-settings__content">{user.email}</span>
            </div>
          </li>
        </ul>
      </div>
      <Link to="/" onClick={logout} className="profile-settings__logout">
        Выйти из аккаунта
      </Link>
    </>
  );
};
