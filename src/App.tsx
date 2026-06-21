import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import "./App.css";
import Logo from "./assets/Logo.svg";
import vk from "./assets/vk.svg";
import telegram from "./assets/telegram.svg";
import youtube from "./assets/rutube.svg";
import ok from "./assets/ok.svg";
import genresIcon from "./assets/genres.svg";
import profileIcon from "./assets/mistermob.svg";
import { AuthModal } from "./components/Modals/AuthModal";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { PrivateRoute } from "./components/PrivateRoute";
import { Loader } from "./components/Loaders/Loader";
import { lazy } from "react";

const HomePage = lazy(() =>
  import("./pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);
const GenresPage = lazy(() =>
  import("./pages/GenresPage").then((m) => ({ default: m.GenresPage })),
);
const FilmPage = lazy(() =>
  import("./pages/FilmPage/FilmPage").then((m) => ({ default: m.FilmPage })),
);
const GenreMoviesPage = lazy(() =>
  import("./pages/GenreMoviesPage/GenreMoviesPage").then((m) => ({
    default: m.GenreMoviesPage,
  })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const ProfileFavorites = lazy(() =>
  import("./components/Profile/ProfileFavorites").then((m) => ({
    default: m.ProfileFavorites,
  })),
);
const ProfileSettings = lazy(() =>
  import("./components/Profile/ProfileSettings").then((m) => ({
    default: m.ProfileSettings,
  })),
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="app">
      <BrowserRouter>
        <header className="header">
          <nav className="header__navbar">
            <Link className="header__logo" to={"/"}>
              <img
                className="header__logo-img"
                src={Logo}
                alt="Логотип Маруси"
              />
            </Link>
            <div className="header__links">
              <NavLink className="header__link header__link--home" to={"/"}>
                <span className="header__link-text">Главная</span>
              </NavLink>
              <NavLink className="header__link" to={"/genres"}>
                <img className="header__link-icon" src={genresIcon} alt="" />
                <span className="header__link-text">Жанры</span>
              </NavLink>
              <Search />
            </div>
            {isAuth ? (
              <NavLink
                to="/profile/favorites"
                className="header__btn header__btn--name"
              >
                {user?.name ?? "Ввести имя"}
              </NavLink>
            ) : (
              <button className="header__btn" onClick={() => setIsOpen(true)}>
                Войти
              </button>
            )}

            <div className="header__mobile-icons">
              <NavLink className="header__mobile-icon" to={"/genres"}>
                <img src={genresIcon} alt="Жанры" />
              </NavLink>
              <Search />
              {isAuth ? (
                <NavLink
                  to="/profile/favorites"
                  className="header__mobile-icon"
                >
                  <img src={profileIcon} alt="Профиль" />
                </NavLink>
              ) : (
                <button
                  className="header__mobile-icon"
                  onClick={() => setIsOpen(true)}
                >
                  <img src={profileIcon} alt="Войти" />
                </button>
              )}
            </div>
          </nav>
          {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
        </header>
        <main className="main">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/movie/:id" element={<FilmPage />} />
              <Route path="/genres/:genre" element={<GenreMoviesPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />}>
                  <Route path="favorites" element={<ProfileFavorites />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>

        <footer className="footer">
          <div className="footer__social">
            <a
              className="footer__social-item"
              href="https://vk.com"
              target="_blank"
            >
              {" "}
              <img src={vk} alt="vk" />
            </a>
            <a
              className="footer__social-item"
              href="https://rutube.com"
              target="_blank"
            >
              {" "}
              <img src={youtube} alt="rutube" />
            </a>
            <a
              className="footer__social-item"
              href="https://ok.ru"
              target="_blank"
            >
              {" "}
              <img src={ok} alt="ok" />
            </a>
            <a
              className="footer__social-item"
              href="https://telegram.com"
              target="_blank"
            >
              {" "}
              <img src={telegram} alt="telegram" />
            </a>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}
