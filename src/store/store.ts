import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import genreReducer from "./slices/genres/genreSlice";
import filmIdReducer from "./slices/filmIdSlice";
import genreMoviesReducer from "./slices/genres/genreMoviesSlice";
import authReducer from "./slices/authSlice";
import favoriteReducer from "./slices/favorite/getFavoritesSlice";
import postfavoriteReducer from "./slices/favorite/postDelFavoriteSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    genre: genreReducer,
    filmId: filmIdReducer,
    genreMovies: genreMoviesReducer,
    auth: authReducer,
    favorite: favoriteReducer,
    postFavorite: postfavoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
