import type { Movie } from "../entities/movies/types";
import { api } from "./http-client";

export const MoviesApi = {
  getAll: () => api.get<Movie[]>("/movie").then((r) => r.data),
  getTop: () => api.get<Movie[]>("/movie/top10").then((r) => r.data),
  getGenres: () => api.get<string[]>("/movie/genres").then((r) => r.data),
  getById: (id: number) => api.get<Movie>(`/movie/${id}`).then((r) => r.data),
  getRandom: () => api.get<Movie>("/movie/random").then((r) => r.data),
  getByGenre: (genre: string) =>
    api.get<Movie[]>("/movie", { params: { genre } }).then((r) => r.data),
  getGroupedByGenre: () =>
    api
      .get<Movie[]>("/movie")
      .then((r) => {
        const list = r.data;
        const grouped: Record<string, Movie[]> = {};
        list.forEach((m) => {
          if (Array.isArray(m.genres)) {
            m.genres.forEach((g) => {
              if (!grouped[g]) grouped[g] = [];
              grouped[g].push(m);
            });
          }
        });
        return grouped;
      }),
};
