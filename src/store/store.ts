import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import genreReducer from "./slices/genreSlice";
import filmIdReducer from "./slices/filmIdSlice";
import genreMoviesReducer from "./slices/genreMoviesSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    genre: genreReducer,
    filmId: filmIdReducer,
    genreMovies: genreMoviesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
