import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FilmBanner } from "../../components/Film/FilmBanner";
import { FilmInfo } from "../../components/Film/FilmInfo/FilmInfo";
import { useAppDispatch } from "../../store/hooks";
import { fetchMovieById } from "../../store/slices/filmIdSlice";
import "./FilmPage.css";

export const FilmPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  useEffect(() => {
    if (isValidMovieId) {
      void dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, isValidMovieId, movieId]);

  if (!isValidMovieId) {
    return <p className="film-page__status">Фильм не найден</p>;
  }

  return (
    <div>
      <section className="film-banner">
        <FilmBanner />
      </section>
      <section className="film-info-page">
        <FilmInfo />
      </section>
    </div>
  );
};
