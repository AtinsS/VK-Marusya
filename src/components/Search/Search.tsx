import { useEffect, useRef, useState } from "react";
import { useCombobox } from "downshift";
import "./Search.css";
import { formatRuntime, ratingColor } from "../../utils/utils";
import { GENRES } from "../../entities/movies/RuTranslate/genreTranslateRu";
import type { Movie } from "../../entities/movies/types";
import { MoviesApi } from "../../api/movies.api";
import { useDebounce } from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/search-mob.svg";

export const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items: movies,
    inputValue,
    itemToString: (item) => (item ? item.title : ""),
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue ?? "");
    },
  });

  const debouncedInput = useDebounce(inputValue, 350);

  useEffect(() => {
    const performSearch = async () => {
      if ((debouncedInput ?? "").length > 2) {
        setIsLoading(true);
        try {
          const all = await MoviesApi.getAll();
          const q = debouncedInput.toLowerCase();
          const filtered = all
            .filter(
              (m) =>
                m.title.toLowerCase().includes(q) ||
                (m.originalTitle || "").toLowerCase().includes(q),
            )
            .slice(0, 5);
          setMovies(filtered);
        } catch (err) {
          console.error("Search error:", err);
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setMovies([]);
      }
    };

    performSearch();
  }, [debouncedInput]);

  const expandSearch = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div ref={containerRef} className={`search${isExpanded ? " search--expanded" : ""}`}>
      <button className="search__icon-btn" onClick={expandSearch} type="button">
        <img src={searchIcon} alt="Поиск" />
      </button>
      <input
        ref={inputRef}
        {...getInputProps({
          placeholder: "Поиск",
          className: "search__input",
        })}
      />
      {isLoading}

      <ul {...getMenuProps({ className: "search__results" })}>
        {isOpen &&
          movies.map((movie, index) => (
            <Link
              className="search__link"
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              <li
                {...getItemProps({
                  item: movie,
                  index,
                  className: `search-item ${
                    highlightedIndex === index ? "search-item--active" : ""
                  }`,
                })}
                key={movie.id}
              >
                <img
                  className="search-item__poster"
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <div className="search-item__info">
                  <div className="search-item__breadcrumbs">
                    <span
                      className="search-item__rating"
                      style={
                        {
                          "--rating-color": ratingColor(movie.tmdbRating),
                        } as React.CSSProperties
                      }
                    >
                      {(movie.tmdbRating ?? 0).toFixed(1)}
                    </span>
                    <span className="search-item__year">
                      {movie.releaseYear}
                    </span>
                    <span className="search-item__genre">
                      {movie.genres?.map((g) => GENRES[g]).join(", ")}
                    </span>
                    <span className="search-item__duration">
                      {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                  <h3 className="search-item__title">{movie.title}</h3>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
