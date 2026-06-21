import { LANGUAGES } from "../../../entities/movies/RuTranslate/languageTranslateRu";
import { useAppSelector } from "../../../store/hooks";
import {
  selectFilmById,
  selectFilmByIdError,
  selectIsFilmByIdLoading,
} from "../../../store/slices/filmIdSlice";
import { Loader } from "../../Loaders/Loader";

import "./FilmInfo.css";

export const FilmInfo = () => {
  const movie = useAppSelector(selectFilmById);
  const isLoading = useAppSelector(selectIsFilmByIdLoading);
  const error = useAppSelector(selectFilmByIdError);

  const rows = movie
    ? [
        ["Язык оригинала", movie.language && LANGUAGES[movie.language]],
        ["Бюджет", movie.budget != null ? `${movie.budget} $` : undefined],
        ["Выручка", movie.revenue != null ? `${movie.revenue} $` : undefined],
        ["Режиссёр", movie.director],
        ["Продакшен", movie.production],
        ["Награды", movie.awardsSummary],
      ]
    : [];

  return (
    <div className="film-info">
      <h1 className="film-info__title">О фильме</h1>
      {isLoading ? <Loader /> : null}
      {error ? <p className="film-info__status">{error}</p> : null}
      {!isLoading && !error && !movie ? (
        <p className="film-info__status">Информация о фильме не найдена</p>
      ) : null}
      {movie ? (
        <ul className="film-info__list">
          {rows.map(([label, value]) => (
            <li className="film-info__item" key={label}>
              <span className="film-info__text">{label}</span>
              <span className="film-info__dots"></span>
              <span className="film-info__text">{value || "Не указано"}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
