import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loaders/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMoviesGrouped,
  selectGenreMovies,
  selectGenreMoviesStatus,
} from "../../store/slices/genres/genreMoviesSlice";
import { GENRES } from "../../entities/movies/RuTranslate/genreTranslateRu";
import "./GenreMoviesPage.css";
import backIcon from "../../assets/back.svg";

export const GenreMoviesPage = () => {
  const [visibleCount, setVisibleCount] = useState(10);

  const dispatch = useAppDispatch();
  const groupedMovies = useAppSelector(selectGenreMovies);
  const status = useAppSelector(selectGenreMoviesStatus);

  const { genre } = useParams<{ genre: string }>();

  useEffect(() => {
    dispatch(fetchMoviesGrouped());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (status === "loading") return <Loader variant="movie" />;
  if (status === "failed")
    return <div className="error">Ошибка загрузки фильмов</div>;
  if (!genre) return <div className="error">Жанр не указан</div>;

  const allMovies = groupedMovies[genre] || [];
  const moviesToShow = allMovies.slice(0, visibleCount);
  const hasMore = allMovies.length > visibleCount;

  return (
    <div className="genre-page">
      <div className="genre-page__head">
        <Link to="/genres">
          <img className="genre-page__back" src={backIcon} alt="Назад" />
        </Link>
        <h1 className="genre-page__title">{GENRES[genre] || genre}</h1>
      </div>

      {allMovies.length === 0 ? (
        <p className="genre-page__status">Фильмы не найдены</p>
      ) : (
        <>
          <ul className="genre-page__list">
            {moviesToShow.map((movie) => (
              <li key={movie.id} className="genre-page__item">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="genre-page__img"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button className="genre-page__btn" onClick={handleShowMore}>
              Показать ещё
            </button>
          )}
        </>
      )}
    </div>
  );
};
