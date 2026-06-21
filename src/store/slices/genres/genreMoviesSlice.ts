import { MoviesApi } from "../../../api/movies.api";
import type { Movie } from "../../../entities/movies/types";
import type { RootState } from "../../store";
import type { RequestStatus } from "../../../entities/auth/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/utils";

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

export const fetchMoviesGrouped = createAsyncThunk<
  Record<string, Movie[]>,
  void,
  { rejectValue: string }
>("genreMovies/fetchGrouped", async (_, { rejectWithValue }) => {
  try {
    const genres = await MoviesApi.getGenres();

    const grouped: Record<string, Movie[]> = {};

    await Promise.all(
      genres.map(async (genre) => {
        try {
          const movies = await MoviesApi.getByGenre(genre);
          grouped[genre] = movies;
        } catch {
          // skip failed genre
        }
      }),
    );

    return grouped;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить фильмы"),
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
        state.error = action.payload ?? "Не удалось загрузить фильмы";
      });
  },
});

export const selectGenreMovies = (state: RootState) => state.genreMovies.movies;
export const selectGenreMoviesStatus = (state: RootState) =>
  state.genreMovies.status;
export const selectGenreMoviesError = (state: RootState) =>
  state.genreMovies.error;
export const selectIsGenreMoviesLoading = (state: RootState) =>
  state.genreMovies.status === "loading";

export default genreMoviesSlice.reducer;
