import heartIcon from "../../../assets/banner/heart.svg";
import updateIcon from "../../../assets/banner/update.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchRandomMovie,
  selectIsRandomMovieLoading,
  selectRandomMovie,
  selectRandomMovieError,
} from "../../../store/slices/homeSlice";
import { Loader } from "../../Loader";
import "./Banner.css";

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
  const title = movie?.title ?? <Loader />;
  const description =
    movie?.plot ?? error ?? "Подбираем случайный фильм для главного баннера";

  return (
    <div className="random-banner">
      <div className="random-banner__left">
        {movie ? (
          <div className="random-banner__info">
            <span className="random-banner__rating">
              {movie.tmdbRating.toFixed(1)}
            </span>
            <span className="random-banner__year">{movie.releaseYear}</span>
            <span className="random-banner__genre">
              {movie.genres.slice(0, 2).join(", ")}
            </span>
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
          <button className="random-banner__button random-banner__button--trailer">
            Трейлер
          </button>
          <button className="random-banner__button random-banner__button--info">
            О фильме
          </button>
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
        <img className="random-banner__image" src={imageSrc} alt={title} />
      </div>
    </div>
  );
};
