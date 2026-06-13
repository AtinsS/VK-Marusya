import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesApi } from "../../api/movies.api";
import type { RootState } from "../store";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface GenreState {
  genres: string[];
  status: RequestStatus;
  error: string | null;
}

export const initialState: GenreState = {
  genres: [],
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const fetchGenres = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("genre/fetchGenres", async (_, { rejectWithValue }) => {
  try {
  const data = await MoviesApi.getGenres();
  return data;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить список жанров"),
    );
  }
});

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = [...new Set(action.payload)];
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Не удалось загрузить список жанров";
      });
  },
});

export const selectGenres = (state: RootState) => state.genre.genres;
export const selectGenreStatus = (state: RootState) => state.genre.status;
export const selectGenreError = (state: RootState) => state.genre.error;
export const selectIsGenreLoading = (state: RootState) =>
  state.genre.status === "loading";

export default genreSlice.reducer;
