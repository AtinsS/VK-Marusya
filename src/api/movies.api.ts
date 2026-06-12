import type { Movie } from "../entities/movies/types";
import { api } from "./http-client";

export const MoviesApi = {
  getAll: () => api.get<Movie[]>("/movie"),
  getTop: () => api.get<Movie[]>("/movie/top10"),
  getGenres: () => api.get<string[]>("/movie/genres"),
  getById: (id: number) => api.get<Movie>(`/movie/${id}`),
  getRandom: () => api.get<Movie>("/movie/random"),
  getByGenre: (genre: string) => api.get<Movie[]>("/movie", { params: { genre } }),
  getAllGroupedByGenre: async () => {
    const { data } = await api.get<Movie[]>('/movie');
    const map: Record<string, Movie[]> = {};
    data.forEach((m) => {
      if (Array.isArray(m.genres) && m.genres.length > 0) {
        m.genres.forEach((g) => {
          if (!map[g]) map[g] = [];
          map[g].push(m);
        });
      } else {
        if (!map.unknown) map.unknown = [];
        map.unknown.push(m);
      }
    });
    return map;
  },
};
