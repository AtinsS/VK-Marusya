import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import type { RootState } from "../store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface GenreMoviesState {
  movies: Movie[];
  status: RequestStatus;
  error: string | null;
}

export const initialState: GenreMoviesState = {
  movies: [],
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

export const fetchMoviesByGenre = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: string }
>("genreMovies/fetchByGenre", async (genre, { rejectWithValue }) => {
  try {
    const { data } = await MoviesApi.getByGenre(genre);
    return data;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить фильмы по жанру"),
    );
  }
});

const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Не удалось загрузить фильмы по жанру";
      });
  },
});

export const selectGenreMovies = (state: RootState) => state.genreMovies.movies;
export const selectGenreMoviesStatus = (state: RootState) => state.genreMovies.status;
export const selectGenreMoviesError = (state: RootState) => state.genreMovies.error;
export const selectIsGenreMoviesLoading = (state: RootState) =>
  state.genreMovies.status === "loading";

export default genreMoviesSlice.reducer;