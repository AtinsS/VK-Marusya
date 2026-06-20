import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import { GENRES } from "../../entities/movies/RuTranslate/genreTranslateRu";
import "./GenresListItem.css";
import { LoaderAll } from "../Loaders/LoaderAll";

interface GenreListItemProps {
  genre: string;
}

export const GenresListItem = ({ genre }: GenreListItemProps) => {
  const [backdropUrl, setBackdropUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const translatedGenre = GENRES[genre] || genre;

  useEffect(() => {
    let mounted = true;

    const fetchBackdrop = async () => {
      try {
        const movies: Movie[] = await MoviesApi.getByGenre(genre);
        const backdrop = movies[10].backdropUrl;
        if (mounted) {
          setBackdropUrl(backdrop);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching backdrop:", error);
      }
    };

    fetchBackdrop();

    return () => {
      mounted = false;
    };
  }, [genre]);
  return (
    <div className="genres-page__wrapper">
      <Link to={`/genres/${genre}`} className="genres-page__link">
        {isLoading ? (
          <div className="genres-page__img-loading">
            <div className="loading-spinner">
              <LoaderAll />
            </div>
          </div>
        ) : (
          <img
            className="genres-page__img"
            src={backdropUrl}
            alt={translatedGenre}
          />
        )}
        <span className="genres-page__name">{translatedGenre}</span>
      </Link>
    </div>
  );
};
