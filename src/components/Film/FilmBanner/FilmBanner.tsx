import { useState } from "react";
import heartIcon from "../../../assets/banner/heart.svg";
import heartAddIcon from "../../../assets/banner/heart_add.svg";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  selectFilmById,
  selectFilmByIdError,
  selectIsFilmByIdLoading,
} from "../../../store/slices/filmIdSlice";
import "./FilmBanner.css";
import { TrailerModal } from "../../Modals/TrailerModal";
import { GENRES } from "../../../entities/movies/RuTranslate/genreTranslateRu";
import { LoaderMovie } from "../../Loaders/LoaderMovie";
import { formatRuntime, ratingColor } from "../../../utils/utils";
import { useAuth } from "../../../hooks/useAuth";
import { AuthModal } from "../../Modals/AuthModal";
import {
  fetchPostFavorite,
  fetchDelFavorite,
} from "../../../store/slices/favorite/postDelFavoriteSlice";
import {
  fetchFavorites,
  selectFavorites,
} from "../../../store/slices/favorite/getFavoritesSlice";

export const FilmBanner = () => {
  const movie = useAppSelector(selectFilmById);
  const isLoading = useAppSelector(selectIsFilmByIdLoading);
  const error = useAppSelector(selectFilmByIdError);

  const imageSrc = movie?.backdropUrl || movie?.posterUrl;
  const title =
    movie?.title ?? (isLoading ? <LoaderMovie /> : "Фильм не найден");
  const description = movie?.plot ?? error ?? "Загружаем информацию о фильме";

  const [isOpen, setIsOpen] = useState(false);

  const genres = movie?.genres.map((genre) => GENRES[genre]).join(", ");

  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const allFavorites = useAppSelector(selectFavorites);

  const isFavorite =
    movie && isAuth
      ? allFavorites.some((f) => String(f.id) === String(movie.id))
      : false;

  const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);

  const handleFavorite = async () => {
    if (!isAuth) {
      setIsOpenModalAuth(true);
      return;
    }
    if (!movie) return;
    try {
      if (isFavorite) {
        await dispatch(fetchDelFavorite(movie.id)).unwrap();
      } else {
        await dispatch(fetchPostFavorite(movie.id)).unwrap();
      }
      void dispatch(fetchFavorites());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="film-banner">
      <div className="film-banner__left">
        {movie ? (
          <div className="film-banner__info">
            <span
              className="film-banner__rating"
              style={
                {
                  "--rating-color": ratingColor(movie.tmdbRating),
                } as React.CSSProperties
              }
            >
              {movie.tmdbRating.toFixed(1)}
            </span>
            <span className="film-banner__year">{movie.releaseYear}</span>
            <span className="film-banner__genre">{genres}</span>
            <span className="film-banner__duration">
              {formatRuntime(movie.runtime)}
            </span>
          </div>
        ) : (
          <p className="film-banner__status">
            {isLoading ? "Загрузка..." : "Фильм не найден"}
          </p>
        )}
        <h1 className="film-banner__title">{title}</h1>
        <p className="film-banner__description">{description}</p>
        <div className="film-banner__actions">
          <button
            className="film-banner__button film-banner__button--trailer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Трейлер
          </button>

          {isOpen && (
            <TrailerModal
              videoId={movie?.trailerYouTubeId ?? ""}
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}

          <button
            className="film-banner__button film-banner__button--favorite"
            aria-label={
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
            onClick={handleFavorite}
          >
            <img src={isFavorite ? heartAddIcon : heartIcon} alt="сердечко" />
          </button>
          {isOpenModalAuth && (
            <AuthModal onClose={() => setIsOpenModalAuth(false)} />
          )}
        </div>
      </div>
      <div className="film-banner__right">
        {imageSrc ? (
          <img
            className="film-banner__image"
            src={imageSrc}
            alt={movie?.title ?? ""}
          />
        ) : null}
      </div>
    </div>
  );
};
