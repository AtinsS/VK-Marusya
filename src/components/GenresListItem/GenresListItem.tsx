import { Link } from "react-router-dom";
import { GENRES } from "../../entities/movies/RuTranslate/genreTranslateRu";
import "./GenresListItem.css";

interface GenreListItemProps {
  genre: string;
}

export const GenresListItem = ({ genre }: GenreListItemProps) => {
  const translatedGenre = GENRES[genre] || genre;

  return (
    <div className="genres-page__wrapper">
      <Link to={`/genres/${genre}`} className="genres-page__link">
        <img
          className="genres-page__img"
          src="src/assets/mok img.jpg"
          alt={translatedGenre}
        />
        <span className="genres-page__name">{translatedGenre}</span>
      </Link>
    </div>
  );
};
