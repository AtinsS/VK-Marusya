import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import type { RootState } from "../store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface GenreMoviesState {
  movies: Record<string, Movie[]>;
  status: RequestStatus;
  error: string | null;
}

export const initialState: GenreMoviesState = {
  movies: {},
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

export const fetchMoviesGrouped = createAsyncThunk<
  Record<string, Movie[]>,
  void,
  { rejectValue: string }
>("genreMovies/fetchGrouped", async (_, { rejectWithValue }) => {
  try {
    const grouped = await MoviesApi.getGroupedByGenre();
    return grouped;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить сгруппированные фильмы"),
    );
  }
});

const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesGrouped.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoviesGrouped.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesGrouped.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Не удалось загрузить сгруппированные фильмы";
      });
  },
});

export const selectGenreMovies = (state: RootState) =>
  state.genreMovies.movies as Record<string, Movie[]>;
export const selectGenreMoviesStatus = (state: RootState) =>
  state.genreMovies.status;
export const selectGenreMoviesError = (state: RootState) =>
  state.genreMovies.error;
export const selectIsGenreMoviesLoading = (state: RootState) =>
  state.genreMovies.status === "loading";

export default genreMoviesSlice.reducer;
