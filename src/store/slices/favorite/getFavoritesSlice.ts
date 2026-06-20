import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavoriteApi } from "../../../api/favorites.api";
import { MoviesApi } from "../../../api/movies.api";
import type { RequestStatus } from "../../../entities/auth/types";
import type { Favorite } from "../../../entities/favorites/types";
import type { Movie } from "../../../entities/movies/types";
import type { RootState } from "../../store";

interface FavoritesState {
  favorites: Favorite[]; // Храним ID избранных фильмов
  movies: Record<number, Movie>; // Кэш полной информации о фильмах
  status: RequestStatus;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  movies: {},
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

export const fetchFavorites = createAsyncThunk<
  { favorites: Favorite[]; movies: Record<number, Movie> },
  void,
  { rejectValue: string }
>("favorites/fetchFavorites", async (_, { rejectWithValue }) => {
  try {
    // Получаем список ID избранных фильмов
    const response = await FavoriteApi.getFavorites();
    const data = response.data;

    // Ответ может быть либо массивом ID, либо объектом { favorites: [...] }
    let rawList: Array<number | string | Record<string, unknown>> = [];
    if (Array.isArray(data)) {
      rawList = data;
    } else if (data && Array.isArray(data.favorites)) {
      rawList = (data).favorites;
    } else {
      console.warn("Unexpected /favorites response shape:", data);
      rawList = [];
    }

    // Нормализуем id: элемент может быть number, string или объект { id }
    const normalizedIds: number[] = rawList
      .map((entry) => {
        if (entry && typeof entry === "object") {
          return Number((entry).id ?? entry);
        }
        return Number(entry);
      })
      .filter((n) => Number.isInteger(n) && n > 0);

    const favorites: Favorite[] = normalizedIds.map((id) => ({ id }));

    // Получаем полную информацию о каждом фильме
    const movies: Record<number, Movie> = {};

    await Promise.all(
      normalizedIds.map(async (numericId) => {
        try {
          const movie = await MoviesApi.getById(numericId);
          movies[numericId] = movie;
        } catch (error) {
          console.warn(`Не удалось загрузить фильм с ID ${numericId}:`, error);
        }
      }),
    );

    return { favorites, movies };
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось загрузить список избранных"),
    );
  }
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload.favorites;
        state.movies = action.payload.movies;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Не удалось загрузить список избранных";
      });
  },
});

export default favoritesSlice.reducer;

export const selectFavorites = (state: RootState) => state.favorite.favorites;
export const selectFavoritesStatus = (state: RootState) =>
  state.favorite.status;
export const selectFavoritesError = (state: RootState) => state.favorite.error;
export const selectFavoriteMovies = (state: RootState) => state.favorite.movies;
