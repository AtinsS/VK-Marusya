import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderMovie } from "../../components/Loaders/LoaderMovie";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import { GENRES } from "../../entities/movies/RuTranslate/genreTranslateRu";
import "./GenreMoviesPage.css";
import backIcon from "../../assets/back.svg";

interface Props {
  genre?: string;
}

export const GenreMoviesPage = ({ genre }: Props) => {
  const [grouped, setGrouped] = useState<Record<string, Movie[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = useParams();
  const selectedGenre = genre ?? params.genre;
  const handleClick = (movieId: number) => navigate(`/movie/${movieId}`);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const map = await MoviesApi.getAllGroupedByGenre();
        if (!mounted) return;
        setGrouped(map as Record<string, Movie[]>);
      } catch {
        setError("Не удалось загрузить фильмы по жанрам");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return <LoaderMovie />;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const genreKeys = Object.keys(grouped).sort();
  const keysToShow = selectedGenre ? [selectedGenre] : genreKeys;

  return (
    <div className="genre-page">
      <div className="genre-page__head">
        {" "}
        <Link to="/genres">
          <img className="genre-page__back" src={backIcon} alt="arrow" />
        </Link>
        <h1 className="genre-page__title">{GENRES[selectedGenre]}</h1>{" "}
      </div>
      {keysToShow.length === 0 ? (
        <p className="genre-page__status">Фильмы не найдены</p>
      ) : (
        keysToShow.map((g) => (
          <section key={g}>
            <ul className="genre-page__list">
              {(grouped[g] || []).map((movie) => (
                <li
                  key={movie.id}
                  className="genre-page__item"
                  onClick={() => handleClick(movie.id)}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="genre-page__img"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
};
