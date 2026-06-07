import { api } from "./http-client";

export const FavoriteApi = {
  getFavorites: () => api.get<number[]>("/favorites"),
  addFavorite: (movieId: number) => api.post<void>(`/favorites/${movieId}`),
  removeFavorite: (movieId: number) =>
    api.delete<void>(`/favorites/${movieId}`),
};
