import { Link } from "react-router-dom";
import heartIcon from "../../../assets/banner/heart.svg";
import heartAddIcon from "../../../assets/banner/heart_add.svg";
import updateIcon from "../../../assets/banner/update.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchRandomMovie,
  selectIsRandomMovieLoading,
  selectRandomMovie,
  selectRandomMovieError,
} from "../../../store/slices/homeSlice";
import "./Banner.css";
import { TrailerModal } from "../../Modals/TrailerModal";
import { useState } from "react";
import { Loader } from "../../Loaders/Loader";
import { GENRES } from "../../../entities/movies/RuTranslate/genreTranslateRu";
import { formatRuntime, ratingColor } from "../../../utils/utils";
import { AuthModal } from "../../Modals/AuthModal";
import { useFavorite } from "../../../hooks/useFavorite";

export const Banner = () => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector(selectRandomMovie);
  const isLoading = useAppSelector(selectIsRandomMovieLoading);
  const error = useAppSelector(selectRandomMovieError);

  const imageSrc = movie?.backdropUrl || movie?.posterUrl;
  const title = movie?.title ?? <Loader variant="movie" />;
  const description =
    movie?.plot ?? error ?? "Подбираем случайный фильм для главного баннера";

  const [isOpen, setIsOpen] = useState(false);

  const genres =
    movie?.genres?.map((genre) => GENRES[genre] || genre).join(", ") || "";

  const { isFavorite, handleFavorite, isOpenModalAuth, setIsOpenModalAuth } =
    useFavorite(movie?.id);

  return (
    <div className="random-banner">
      <div className="random-banner__left">
        {isLoading && !movie ? (
          <div className="random-banner__status">Ждёмс...</div>
        ) : movie ? (
          <div className="random-banner__info">
            <span
              className="random-banner__rating"
              style={
                {
                  "--rating-color": ratingColor(movie.tmdbRating),
                } as React.CSSProperties
              }
            >
              {movie.tmdbRating?.toFixed(1) || "N/A"}
            </span>
            <span className="random-banner__year">
              {movie.releaseYear || "N/A"}
            </span>
            <span className="film-banne__genre">{genres}</span>
            <span className="random-banner__duration">
              {movie.runtime ? formatRuntime(movie.runtime) : "N/A"}
            </span>
          </div>
        ) : (
          <p className="random-banner__status">{error || "Фильм не найден"}</p>
        )}

        <h1 className="random-banner__title">{title}</h1>
        <p className="random-banner__description">{description}</p>

        <div className="random-banner__actions">
          {movie?.trailerYouTubeId && (
            <button
              onClick={() => setIsOpen(true)}
              className="random-banner__button random-banner__button--trailer"
            >
              Трейлер
            </button>
          )}

          {isOpen && movie?.trailerYouTubeId && (
            <TrailerModal
              videoId={movie.trailerYouTubeId}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          )}

          {movie && (
            <Link
              to={`/movie/${movie.id}`}
              className="random-banner__button random-banner__button--info"
            >
              О фильме
            </Link>
          )}

          <button
            className="random-banner__button random-banner__button--favorite"
            aria-label={
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
            onClick={handleFavorite}
          >
            <img src={isFavorite ? heartAddIcon : heartIcon} alt="сердечко" />
          </button>

          <button
            className="random-banner__button random-banner__button--update"
            aria-label="Обновить"
            disabled={isLoading}
            onClick={() => {
              void dispatch(fetchRandomMovie());
            }}
          >
            <img src={updateIcon} alt="Обновить" />
          </button>
        </div>

        {isOpenModalAuth && (
          <AuthModal onClose={() => setIsOpenModalAuth(false)} />
        )}
      </div>

      <div className="random-banner__right">
        {imageSrc ? (
          <img
            className="random-banner__image"
            src={imageSrc}
            alt={movie?.title ?? "Постер фильма"}
          />
        ) : (
          <div className="random-banner__image-placeholder">
            Изображение недоступно
          </div>
        )}
      </div>
    </div>
  );
};
