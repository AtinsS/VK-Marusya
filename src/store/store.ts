import { configureStore } from "@reduxjs/toolkit";
import filmIdReducer from "./slices/filmIdSlice";
import homeReducer from "./slices/homeSlice";

export const store = configureStore({
  reducer: {
    filmId: filmIdReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
