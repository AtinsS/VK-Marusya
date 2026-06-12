import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMoviesByGenre,
  selectGenreMovies,
  selectIsGenreMoviesLoading,
  selectGenreMoviesError,
} from "../../store/slices/genreMoviesSlice";
import { LoaderMovie } from "../../components/Loaders/LoaderMovie";
import "./GenreMoviesPage.css";


export const GenreMoviesPage = ({ genre }) => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectGenreMovies);
  const isLoading = useAppSelector(selectIsGenreMoviesLoading);
  const error = useAppSelector(selectGenreMoviesError);

  const navigate = useNavigate();
  const handleClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (genre) {
      dispatch(fetchMoviesByGenre(genre));
    }
  }, [dispatch, genre]);

  if (isLoading) {
    return <LoaderMovie />;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="genre-page">
      <h1 className="genre-page__title">{genre}</h1>
      {movies.length > 0 ? (
        <ul className="genre-page__list">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="genre-page__item"
              onClick={() => handleClick(movie.id)}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="genre-page__img"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Фильмы не найдены</p>
      )}
    </div>
  );
};
