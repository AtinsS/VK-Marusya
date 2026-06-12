import "./GenreList.css";

export const GenreList = () => {
  return (

    <div className="genre-page">
      <h1 className="genre-page__title">Жанры фильмов</h1>
      <ul className="genre-page__list">
        <li className="genre-page__item">
          <div className="genre-page__wrapper">
            <img
              className="genre-page__img"
              src="src/assets/mok img.jpg"
              alt="мок"
            />
            <span className="genre-page__name">Драма</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
