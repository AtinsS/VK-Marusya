import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import { HomePage } from "./pages/HomePage/HomePage";
import { GenrePage } from "./pages/GenrePage/GenrePage";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <header className="header">
          <nav className="header__navbar">
            <Link className="header__logo" to={"/"}>
              <img
                className="header__logo-img"
                src="src/assets/Logo.svg"
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
            <Route path="/genres" element={<GenrePage />}></Route>
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
              <img src="src/assets/vk.svg" alt="vk" />
            </a>
            <a
              className="footer__social-item"
              href="https://rutube.com"
              target="_blank"
            >
              {" "}
              <img src="src/assets/rutube.svg" alt="rutube" />
            </a>
            <a
              className="footer__social-item"
              href="https://ok.com"
              target="_blank"
            >
              {" "}
              <img src="src/assets/ok.svg" alt="ok" />
            </a>
            <a
              className="footer__social-item"
              href="https://telegram.com"
              target="_blank"
            >
              {" "}
              <img src="src/assets/telegram.svg" alt="telegram" />
            </a>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}
