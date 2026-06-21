import { useEffect } from "react";
import { GenresListItem } from "../../components/GenresListItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchGenres,
  selectGenres,
  selectGenreStatus,
  selectGenreError,
} from "../../store/slices/genres/genreSlice";
import "./GenresPage.css";
import { Loader } from "../../components/Loaders/Loader";

export const GenresPage = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  const status = useAppSelector(selectGenreStatus);
  const error = useAppSelector(selectGenreError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGenres());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div>
        <Loader variant="genre" />
      </div>
    );
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="genres-page">
      <h1 className="genres-page__title">Жанры фильмов</h1>
      <ul className="genres-page__list">
        {genres.map((genre) => (
          <li key={genre} className="genres-page__item">
            <GenresListItem genre={genre} />
          </li>
        ))}
      </ul>
    </div>
  );
};
