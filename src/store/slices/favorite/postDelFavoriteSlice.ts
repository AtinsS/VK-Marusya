import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RequestStatus } from "../../../entities/auth/types";
import { FavoriteApi } from "../../../api/favorites.api";
import type { RootState } from "../../store";
import { getErrorMessage } from "../../../utils/utils";

interface ToggleFavoriteState {
  status: RequestStatus;
  error: string | null;
}

export const initialState: ToggleFavoriteState = {
  status: "idle",
  error: null,
};

export const fetchPostFavorite = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("postFavorite/fetchPostFavorite", async (id, { rejectWithValue }) => {
  try {
    await FavoriteApi.addFavorite(id);
    return id;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, "Не удалось добавить в избранное"),
    );
  }
});

export const fetchDelFavorite = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("delFavorite/fetchDelFavorite", async (id, { rejectWithValue }) => {
  try {
    await FavoriteApi.removeFavorite(id);
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
