import { useEffect } from "react";
import { GenresListItem } from "../../components/GenresListItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchGenres,
  selectGenres,
  selectGenreStatus,
} from "../../store/slices/genreSlice";
import "./GenresPage.css";
import { LoaderGenre } from "../../components/Loaders/LoaderGenre";

export const GenresPage = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  const status = useAppSelector(selectGenreStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGenres());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div>
        <LoaderGenre />
      </div>
    );
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
