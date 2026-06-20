import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchFavorites,
  selectFavoriteMovies,
  selectFavorites,
  selectFavoritesError,
  selectFavoritesStatus,
} from "../../../store/slices/favorite/getFavoritesSlice";
import { LoaderMovie } from "../../Loaders/LoaderMovie";
import { useEffect } from "react";

export const ProfileFavorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const status = useAppSelector(selectFavoritesStatus);
  const error = useAppSelector(selectFavoritesError);
  const movies = useAppSelector(selectFavoriteMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? <LoaderMovie /> : null}
      {error ? <p className="top-films__status">{error}</p> : null}
      {favorites.length === 0 ? (
        <p className="top-films__status">У вас нет избранных фильмов</p>
      ) : null}
      {favorites.length > 0 ? (
        <ul className="top-films__list">
          {favorites.map((favorite) => {
            // Защищенно вычисляем числовой id (на случай, если favorite.id — строка или объект)
            const idRaw = favorite.id ?? favorite;
            const idNumber = Number(idRaw);
            const movie = movies[idNumber];
            return (
              <li key={String(idNumber)} className="top-films__item">
                <Link to={`/movie/${idNumber}`}>
                  {movie ? (
                    <>
                      <img src={movie.posterUrl} alt={movie.title} />
                    </>
                  ) : (
                    <div>Загрузка...</div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
