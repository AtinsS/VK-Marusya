import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import type { RootState } from "../store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface HomeState {
  randomMovie: Movie | null;
  topMovies: Movie[];
  randomMovieStatus: RequestStatus;
  topMoviesStatus: RequestStatus;
  randomMovieError: string | null;
  topMoviesError: string | null;  
}

export const initialState: HomeState = {
  randomMovie: null,
  topMovies: [],
  randomMovieStatus: "idle",
  topMoviesStatus: "idle",
  randomMovieError: null,
  topMoviesError: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const fetchRandomMovie = createAsyncThunk<
  Movie,
  void,
  { rejectValue: string }
>("home/fetchRandomMovie", async (_, { rejectWithValue }) => {
  try {
  const data = await MoviesApi.getRandom();
  return data;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить случайный фильм"),
    );
  }
});

export const fetchTopMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("home/fetchTopMovies", async (_, { rejectWithValue }) => {
  try {
  const data = await MoviesApi.getTop();
  return data;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить топ фильмов"),
    );
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomMovie.pending, (state) => {
        state.randomMovieStatus = "loading";
        state.randomMovieError = null;
      })
      .addCase(fetchRandomMovie.fulfilled, (state, action) => {
        state.randomMovieStatus = "succeeded";
        state.randomMovie = action.payload;
      })
      .addCase(fetchRandomMovie.rejected, (state, action) => {
        state.randomMovieStatus = "failed";
        state.randomMovieError =
          action.payload ?? "Не удалось загрузить случайный фильм";
      })
      .addCase(fetchTopMovies.pending, (state) => {
        state.topMoviesStatus = "loading";
        state.topMoviesError = null;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.topMoviesStatus = "succeeded";
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state, action) => {
        state.topMoviesStatus = "failed";
        state.topMoviesError = action.payload ?? "Не удалось загрузить топ фильмов";
      });
  },
});

export const selectRandomMovie = (state: RootState) => state.home.randomMovie;
export const selectTopMovies = (state: RootState) => state.home.topMovies;
export const selectRandomMovieStatus = (state: RootState) =>
  state.home.randomMovieStatus;
export const selectTopMoviesStatus = (state: RootState) =>
  state.home.topMoviesStatus;
export const selectIsRandomMovieLoading = (state: RootState) =>
  state.home.randomMovieStatus === "loading";
export const selectIsTopMoviesLoading = (state: RootState) =>
  state.home.topMoviesStatus === "loading";
export const selectRandomMovieError = (state: RootState) =>
  state.home.randomMovieError;
export const selectTopMoviesError = (state: RootState) =>
  state.home.topMoviesError;

export default homeSlice.reducer;
