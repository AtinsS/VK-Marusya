import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import genreReducer from "./slices/genreSlice";
import filmIdReducer from "./slices/filmIdSlice";
import genreMoviesReducer from "./slices/genreMoviesSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    genre: genreReducer,
    filmId: filmIdReducer,
    genreMovies: genreMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
