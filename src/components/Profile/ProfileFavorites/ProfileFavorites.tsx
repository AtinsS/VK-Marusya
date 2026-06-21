import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchFavorites,
  selectFavoriteMovies,
  selectFavorites,
  selectFavoritesError,
  selectFavoritesStatus,
} from "../../../store/slices/favorite/getFavoritesSlice";
import { Loader } from "../../Loaders/Loader";
import { useEffect } from "react";
import "./ProfileFavorites.css";
import { fetchDelFavorite } from "../../../store/slices/favorite/postDelFavoriteSlice";

export const ProfileFavorites = () => {
  const favorites = useAppSelector(selectFavorites);
  const status = useAppSelector(selectFavoritesStatus);
  const error = useAppSelector(selectFavoritesError);
  const movies = useAppSelector(selectFavoriteMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(fetchDelFavorite(id)).unwrap();
      await dispatch(fetchFavorites());
    } catch (err) {
      console.error("Ошибка при удалении из избранного", err);
    }
  };

  return (
    <>
      {status === "loading" ? <Loader variant="movie" /> : null}
      {error ? <p className="favorite__status">{error}</p> : null}
      {favorites.length === 0 ? (
        <p className="favorite__status">У вас нет избранных фильмов</p>
      ) : null}
      {favorites.length > 0 ? (
        <ul className="favorite__list">
          {favorites.map((favorite) => {
            const idRaw = favorite.id ?? favorite;
            const idNumber = Number(idRaw);
            const movie = movies[idNumber];
            return (
              <li key={String(idNumber)} className="favorite__item">
                <Link to={`/movie/${idNumber}`}>
                  {movie ? (
                    <>
                      <img src={movie.posterUrl} alt={movie.title} />
                    </>
                  ) : (
                    <div>Загрузка...</div>
                  )}
                </Link>
                <button
                  onClick={() => handleDelete(idNumber)}
                  className="favorite__delete"
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
