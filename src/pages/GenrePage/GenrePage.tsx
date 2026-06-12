import { GenreList } from "../../components/GenreList";
import "./GenrePage.css";

export const GenrePage = () => {
  return (
    <div className="genre-page">
      <section className="genre-page__section">
        <GenreList />
      </section>
    </div>
  );
};
