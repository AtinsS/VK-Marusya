import { useEffect } from "react";
import { Banner } from "../../components/Hero/Banner";
import { TopMovies } from "../../components/Hero/TopMovies/TopMovies";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchRandomMovie,
  fetchTopMovies,
  selectRandomMovieStatus,
  selectTopMoviesStatus,
} from "../../store/slices/homeSlice";
import "./HomePage.css";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const randomMovieStatus = useAppSelector(selectRandomMovieStatus);
  const topMoviesStatus = useAppSelector(selectTopMoviesStatus);

  useEffect(() => {
    if (randomMovieStatus === "idle") {
      void dispatch(fetchRandomMovie());
    }
    if (topMoviesStatus === "idle") {
      void dispatch(fetchTopMovies());
    }
  }, [dispatch, randomMovieStatus, topMoviesStatus]);

  return (
    <div>
      <section className="hero">
        <Banner />
      </section>
      <section className="top-movies">
        {" "}
        <TopMovies />
      </section>
    </div>
  );
};
