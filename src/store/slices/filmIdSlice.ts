import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesApi } from "../../api/movies.api";
import type { Movie } from "../../entities/movies/types";
import type { RootState } from "../store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface FilmIdState {
  movie: Movie | null;
  movieId: number | null;
  status: RequestStatus;
  error: string | null;
}

export const initialState: FilmIdState = {
  movie: null,
  movieId: null,
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const fetchMovieById = createAsyncThunk<
  Movie,
  number,
  { rejectValue: string }
>("filmId/fetchMovieById", async (id, { rejectWithValue }) => {
  try {
  const data = await MoviesApi.getById(id);
  return data;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить информацию о фильме"),
    );
  }
});

const filmIdSlice = createSlice({
  name: "filmId",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.movie = null;
        state.movieId = action.meta.arg;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
        state.movieId = action.payload.id;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Не удалось загрузить информацию о фильме";
      });
  },
});

export const selectFilmById = (state: RootState) => state.filmId.movie;
export const selectFilmByIdStatus = (state: RootState) => state.filmId.status;
export const selectFilmByIdError = (state: RootState) => state.filmId.error;
export const selectIsFilmByIdLoading = (state: RootState) =>
  state.filmId.status === "loading";

export default filmIdSlice.reducer;
