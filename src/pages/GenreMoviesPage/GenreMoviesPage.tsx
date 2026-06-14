import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    {},
  );

  const params = useParams();
  const selectedGenre = genre ?? params.genre;

  function getErrorMessage(error: unknown, fallback: string) {
    if (error instanceof Error) return error.message;
    return fallback;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        if (selectedGenre) {
          const movies = await MoviesApi.getByGenre(selectedGenre);
          setGrouped({ [selectedGenre]: movies });
        }
      } catch (error) {
        setError(getErrorMessage(error, "Не удалось загрузить фильмы"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre]);

  const handleShowMore = (genreKey: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [genreKey]: (prev[genreKey] ?? 10) + 10,
    }));
  };

  if (isLoading) return <LoaderMovie />;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const genreKeys = Object.keys(grouped).sort();
  const keysToShow = selectedGenre ? [selectedGenre] : genreKeys;

  return (
    <div className="genre-page">
      <div className="genre-page__head">
        <Link to="/genres">
          <img className="genre-page__back" src={backIcon} alt="arrow" />
        </Link>
        <h1 className="genre-page__title">{GENRES[selectedGenre]}</h1>
      </div>

      {keysToShow.length === 0 ? (
        <p className="genre-page__status">Фильмы не найдены</p>
      ) : (
        keysToShow.map((g) => {
          const movies = grouped[g] || [];
          const limit = visibleCounts[g] ?? 10;
          const moviesToShow = movies.slice(0, limit);
          const hasMore = movies.length > limit;

          return (
            <section key={g}>
              <ul className="genre-page__list">
                {moviesToShow.map((movie) => (
                  <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <li className="genre-page__item">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="genre-page__img"
                      />
                    </li>
                  </Link>
                ))}
              </ul>

              {hasMore && (
                <button
                  className="genre-page__btn"
                  onClick={() => handleShowMore(g)}
                >
                  Показать ещё
                </button>
              )}
            </section>
          );
        })
      )}
    </div>
  );
};
