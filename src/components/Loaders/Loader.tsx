import "./LoaderAll.css";
import "./LoaderGenre.css";
import "./LoaderMovie.css";

type LoaderVariant = "all" | "genre" | "movie";

const classNameMap: Record<LoaderVariant, string> = {
  all: "loader",
  genre: "loader-genre",
  movie: "loader-movie",
};

export const Loader = ({ variant = "all" }: { variant?: LoaderVariant }) => {
  return <span className={classNameMap[variant]} />;
};
