import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import { FilmPage } from "./pages/FilmPage/FilmPage";
import { HomePage } from "./pages/HomePage/HomePage";
import "./App.css";
import { GenresPage } from "./pages/GenresPage";
import { GenreMoviesPage } from "./pages/GenreMoviesPage/GenreMoviesPage";
import Logo from "./assets/Logo.svg";
import vk from "./assets/vk.svg";
import telegram from "./assets/telegram.svg";
import youtube from "./assets/rutube.svg";
import ok from "./assets/ok.svg";

export default function App() {
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
              <NavLink className="header__link" to={"/"}>
                Главная
              </NavLink>
              <NavLink className="header__link" to={"/genres"}>
                Жанры
              </NavLink>
              <Search />
            </div>
            <button className="header__btn">Войти</button>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genres" element={<GenresPage />}></Route>
            <Route path="/movie/:id" element={<FilmPage />} />
            <Route path="/genres/:genre" element={<GenreMoviesPage />} />
          </Routes>
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
              href="https://ok.com"
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
