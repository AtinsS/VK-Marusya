import { Link } from "react-router-dom";
import heartIcon from "../../../assets/banner/heart.svg";
import updateIcon from "../../../assets/banner/update.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchRandomMovie,
  selectIsRandomMovieLoading,
  selectRandomMovie,
  selectRandomMovieError,
} from "../../../store/slices/homeSlice";
import "./Banner.css";
import { TrailerModal } from "../../TrailerModal";
import { useState } from "react";
import { LoaderMovie } from "../../Loaders/LoaderMovie";
import { GENRES } from "../../../entities/movies/RuTranslate/genreTranslateRu";

const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) {
    return `${minutes} мин`;
  }

  if (!minutes) {
    return `${hours} ч`;
  }

  return `${hours} ч ${minutes} мин`;
};

export const Banner = () => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector(selectRandomMovie);
  const isLoading = useAppSelector(selectIsRandomMovieLoading);
  const error = useAppSelector(selectRandomMovieError);

  const imageSrc = movie?.backdropUrl || movie?.posterUrl;
  const title = movie?.title ?? <LoaderMovie />;
  const description =
    movie?.plot ?? error ?? "Подбираем случайный фильм для главного баннера";

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
            onClick={() => setIsOpen(true)}
            className="random-banner__button random-banner__button--trailer"
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

          <Link
            to={`/movie/${movie?.id}`}
            className="random-banner__button random-banner__button--info"
          >
            О фильме
          </Link>
          <button
            className="random-banner__button random-banner__button--favorite"
            aria-label="В избранное"
          >
            <img src={heartIcon} alt="" />
          </button>
          <button
            className="random-banner__button random-banner__button--update"
            aria-label="Обновить"
            disabled={isLoading}
            onClick={() => {
              void dispatch(fetchRandomMovie());
            }}
          >
            <img src={updateIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="random-banner__right">
        <img
          className="random-banner__image"
          src={imageSrc}
          alt={movie?.title ?? ""}
        />
      </div>
    </div>
  );
};
