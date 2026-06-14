import { useState } from "react";
import heartIcon from "../../../assets/banner/heart.svg";
import { useAppSelector } from "../../../store/hooks";
import {
  selectFilmById,
  selectFilmByIdError,
  selectIsFilmByIdLoading,
} from "../../../store/slices/filmIdSlice";
import "./FilmBanner.css";
import { TrailerModal } from "../../Modals/TrailerModal";
import { GENRES } from "../../../entities/movies/RuTranslate/genreTranslateRu";
import { LoaderMovie } from "../../Loaders/LoaderMovie";
import { formatRuntime } from "../../../utils/utils";

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

  return (
    <div className="random-banner">
      <div className="random-banner__left">
        {movie ? (
          <div className="random-banner__info">
            <span className="random-banner__rating">
              {movie.tmdbRating.toFixed(1)}
            </span>
            <span className="random-banner__year">{movie.releaseYear}</span>
            <span className="random-banner__genre">{genres}</span>
            <span className="random-banner__duration">
              {formatRuntime(movie.runtime)}
            </span>
          </div>
        ) : (
          <p className="random-banner__status">
            {isLoading ? "Загрузка..." : "Фильм не найден"}
          </p>
        )}
        <h1 className="random-banner__title">{title}</h1>
        <p className="random-banner__description">{description}</p>
        <div className="random-banner__actions">
          <button
            className="random-banner__button random-banner__button--trailer"
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
            className="random-banner__button random-banner__button--favorite"
            aria-label="В избранное"
          >
            <img src={heartIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="random-banner__right">
        {imageSrc ? (
          <img
            className="random-banner__image"
            src={imageSrc}
            alt={movie?.title ?? ""}
          />
        ) : null}
      </div>
    </div>
  );
};
