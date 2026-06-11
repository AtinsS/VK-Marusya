import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  selectIsTopMoviesLoading,
  selectTopMovies,
  selectTopMoviesError,
} from "../../../store/slices/homeSlice";
import "./TopMovies.css";

export const TopMovies = () => {
  const topMovies = useAppSelector(selectTopMovies);
  const isLoading = useAppSelector(selectIsTopMoviesLoading);
  const error = useAppSelector(selectTopMoviesError);

  const navigate = useNavigate();
  const handleClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <h2 className="top-films">Топ 10 фильмов</h2>
      {isLoading && topMovies.length === 0 ? (
        <p className="top-films__status">Загружаем топ фильмов...</p>
      ) : null}
      {error && topMovies.length === 0 ? (
        <p className="top-films__status">{error}</p>
      ) : null}
      {topMovies.length > 0 ? (
        <ul className="top-films__list">
          {topMovies.map((movie, index) => (
            <li
              onClick={() => handleClick(movie.id)}
              className="top-films__item"
              key={movie.id}
            >
              <span className="top-films__number">{index + 1}</span>
              <img src={movie.posterUrl} alt={movie.title} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
