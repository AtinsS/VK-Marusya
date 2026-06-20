import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RequestStatus } from "../../../entities/auth/types";
import { FavoriteApi } from "../../../api/favorites.api";
import type { RootState } from "../../store";

interface ToggleFavoriteState {
  status: RequestStatus;
  error: string | null;
}

const initialState: ToggleFavoriteState = {
  status: "idle",
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

//Санка на добавление в избранное
export const fetchPostFavorite = createAsyncThunk<
  number, // Возвращаем ID фильма, который добавили в избранное
  number, // Принимаем ID фильма как аргумент
  { rejectValue: string }
>("postFavorite/fetchPostFavorite", async (id, { rejectWithValue }) => {
  try {
    await FavoriteApi.addFavorite(id);
    console.log(`Фильм добавлен в избранное ${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось добавить в избранное"),
    );
  }
});

//Санка на удаление из избранного
export const fetchDelFavorite = createAsyncThunk<
  number, // Возвращаем ID фильма, который удалили из избранного
  number, // Принимаем ID фильма как аргумент
  { rejectValue: string }
>("delFavorite/fetchDelFavorite", async (id, { rejectWithValue }) => {
  try {
    await FavoriteApi.removeFavorite(id);
    console.log(`Фильм удален из избранного ${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось удалить из избранного"),
    );
  }
});

export const toggleFavoriteSlice = createSlice({
  name: "postFavorite",
  initialState,
  reducers: {
    resetFavoriteStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Слайс на добавление в избранное
      .addCase(fetchPostFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostFavorite.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchPostFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Не удалось добавить в избранное";
      })
      //Слайс на удаление из избранного
      .addCase(fetchDelFavorite.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDelFavorite.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchDelFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Не удалось удалить из избранного";
      });
  },
});
export const { resetFavoriteStatus } = toggleFavoriteSlice.actions;
export default toggleFavoriteSlice.reducer;

export const selectFavoriteStatus = (state: RootState) =>
  state.postFavorite.status;
export const selectFavoriteToggleError = (state: RootState) =>
  state.postFavorite.error;
