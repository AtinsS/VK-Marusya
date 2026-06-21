import { api } from "./http-client";

export const FavoriteApi = {
  // Сервер может возвращать либо массив ID, либо объект с полем { favorites: [...] }
  getFavorites: () => api.get("/favorites"),
  // По документации нужно отправлять POST /favorites с телом { id: string }
  addFavorite: (movieId: number | string) =>
    api.post<void>("/favorites", { id: String(movieId) }),

  removeFavorite: (movieId: number | string) =>
    api.delete<void>(`/favorites/${String(movieId)}`),
};
